import { Session, Stream, Subscriber, SubscriberProperties } from '@opentok/client';
import { useRef, useCallback } from 'react';
import toast from 'react-hot-toast';

type SubscriberOptions = {
  containerId: string;
  options?: Partial<SubscriberProperties>;
};

/**
 * `useSubscriber` is a custom hook that manages the lifecycle of an OpenTok Subscriber.
 * It provides functions to initialize and unsubscribe a subscriber in a video session.
 * Additionally, it displays success and error notifications during the subscription process.
 *
 * @returns {Object} - Contains methods to initialize and unsubscribe a subscriber, and a reference to the current subscriber.
 * @property {Function} initSubscriber - Initializes the subscriber with the specified session and stream.
 * @property {Function} unsubscribe - Unsubscribes and cleans up the current subscriber.
 * @property {Subscriber | null} subscriber - The current subscriber instance, or null if no subscriber is active.
 */
function useSubscriber() {
  const subscriberRef = useRef<Subscriber | null>(null);
  const initSubscriber = useCallback(
    async ({ containerId, options }: SubscriberOptions, session: Session, stream: Stream) => {
      if (subscriberRef.current) return;

      if (!containerId || !session || !stream) return;

      const finalSubscriberOptions: SubscriberProperties = {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        ...options,
        style: { buttonDisplayMode: 'on', nameDisplayMode: 'on' },
        showControls: false,
      };

      subscriberRef.current = session.subscribe(
        stream,
        containerId,
        finalSubscriberOptions,
        (err: any) => {
          if (err) {
            toast.error("Erro ao exibir o vídeo do participante.");
            subscriberRef.current = null;
          } else {
            toast.success("Vídeo do participante carregado com sucesso.");
          }
        }
      );
    },
    []
  );

  const unsubscribe = useCallback((session: Session) => {
    if (session && subscriberRef.current) {
      session.unsubscribe(subscriberRef.current);
      subscriberRef.current = null;
    }
  }, []);

  return {
    initSubscriber,
    unsubscribe,
    subscriber: subscriberRef.current,
  };
};

export { useSubscriber };
