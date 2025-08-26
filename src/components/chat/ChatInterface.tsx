
'use client';

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, MessageCircle, Bot, User } from 'lucide-react';
import { askChatbot } from '@/app/actions';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type ChatFormData = z.infer<typeof chatSchema>;
export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

export type ChatInterfaceHandles = {
  submitQuery: (query: string) => void;
};

interface ChatInterfaceProps {}

const ChatInterface = forwardRef<ChatInterfaceHandles, ChatInterfaceProps>((_props, ref) => {
  const { language } = useAppContext();
  const t = translations[language].homeTab.chat;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatFormData>({
    resolver: zodResolver(chatSchema),
  });

  useEffect(() => {
    if (messages.length === 0 && !isLoading) {
      setMessages([{ id: 0, text: t.welcome, sender: 'bot' }]);
    }
  }, [t.welcome, messages.length, isLoading]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const processSubmit = async (data: ChatFormData) => {
    if (!data.message.trim()) return;
    const userMessage: Message = { id: Date.now(), text: data.message, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    reset();

    try {
      const botResponse = await askChatbot(data.message, language);
      const botMessage: Message = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (text: string) => {
    processSubmit({ message: text });
  };

  useImperativeHandle(ref, () => ({
    submitQuery(query: string) {
      processSubmit({ message: query });
    },
  }));

  return (
    <Card className="overflow-hidden shadow-md">
      <CardHeader className="bg-primary p-3">
        <CardTitle className="flex items-center font-bold text-primary-foreground text-base">
          <MessageCircle className="mr-2 h-5 w-5" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={chatWindowRef} className="h-64 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn('flex items-end gap-2', msg.sender === 'user' ? 'justify-end' : 'justify-start')}
            >
              {msg.sender === 'bot' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'rounded-lg px-3 py-2 max-w-[80%] shadow-sm',
                  msg.sender === 'user' ? 'bg-primary/20' : 'bg-white'
                )}
              >
                <p className="text-sm text-foreground whitespace-pre-wrap">{msg.text}</p>
                {msg.sender === 'bot' && messages.length === 1 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {t.quickReplies.map((reply, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant="outline"
                        className="text-xs h-auto py-1 px-2"
                        onClick={() => handleQuickReply(reply)}
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              {msg.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-300"><User className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-3 py-2 bg-white shadow-sm">
                <div className="flex items-center space-x-1">
                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          {isLoading && messages.length === 0 && (
            <div className="space-y-2">
              <Skeleton className="h-12 w-3/4" />
              <div className="flex justify-end">
                <Skeleton className="h-8 w-1/2" />
              </div>
              <Skeleton className="h-16 w-4/5" />
            </div>
          )}
        </div>
        <div className="p-3 bg-gray-100 border-t">
          <form onSubmit={handleSubmit(processSubmit)} className="flex items-center">
            <Input
              {...register('message')}
              placeholder={t.placeholder}
              className="flex-grow bg-white focus:ring-2 focus:ring-primary/50 rounded-full"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" className="ml-2 shrink-0 rounded-full bg-primary text-white transition-colors hover:bg-primary/90" disabled={isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
      </CardContent>
    </Card>
  );
});

ChatInterface.displayName = 'ChatInterface';

export default ChatInterface;
