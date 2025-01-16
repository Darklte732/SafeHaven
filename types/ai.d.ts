declare module 'ai' {
  export class StreamingTextResponse extends Response {
    constructor(
      stream: ReadableStream,
      init?: ResponseInit,
      data?: experimental_StreamData
    );
  }

  export class experimental_StreamData {
    append(data: any): void;
    close(): void;
  }
}

declare module 'ai/react' {
  export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
  }

  export function useChat(options?: {
    api?: string;
    id?: string;
    initialMessages?: Message[];
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
    onResponse?: (response: Response) => void | Promise<void>;
    onFinish?: (message: Message) => void;
    onError?: (error: Error) => void;
  }): {
    messages: Message[];
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
  };
} 