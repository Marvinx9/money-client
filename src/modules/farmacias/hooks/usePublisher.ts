// src/hooks/usePublisher.ts
import OT, { Publisher, PublisherProperties, Session } from '@opentok/client';
import { useRef, useCallback } from 'react';
import toast from 'react-hot-toast';

interface PublisherOptions {
  containerId: string;
  options?: Partial<PublisherProperties>;
}

/**
 * `usePublisher` is a custom hook that manages the lifecycle of an OpenTok Publisher.
 * It provides functions to initialize, publish, and unpublish a video stream in a session.
 * Notifications are shown for success and error events during these actions.
 *
 * @returns {Object} - Contains methods to initialize, publish, and unpublish a publisher, and a reference to the current publisher.
 * @property {Function} initPublisher - Initializes the publisher with specified options and container.
 * @property {Function} publish - Publishes the current publisher's stream in a given session.
 * @property {Function} unpublish - Unpublishes the current publisher's stream from a session.
 * @property {Publisher | null} publisher - The current publisher instance, or null if no publisher is active.
 */
function usePublisher() {
  const publisherRef = useRef<Publisher | null>(null);

  const initPublisher = useCallback(
    ({ containerId, options = {} }: PublisherOptions) => {
      if (publisherRef.current) {
        toast.success("Conexão iniciada");
        return;
      }

      if (!containerId) {
        toast.error('Contêiner não disponível');
        return;
      }

      const finalPublisherOptions: PublisherProperties = {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        ...options,
        style: { buttonDisplayMode: 'off', nameDisplayMode: 'on' },
        showControls: false,
      };

      publisherRef.current = OT.initPublisher(containerId, finalPublisherOptions, (err) => {
        if (err) {
          toast.error("Erro ao criar contêiner");
          publisherRef.current = null;
        } else {
          toast.success("Contêiner criado");
        }
      });
    },
    []
  );

  const publish = useCallback((session: Session) => {
    if (!session || !publisherRef.current) return;
    session.publish(publisherRef.current, (err) => {
      if (err) {
        toast.error("Erro ao iniciar a stream");
      } else {
        toast.success('Stream iniciada');
      }
    });
  }, []);

  const unpublish = useCallback((session: Session) => {
    if (session && publisherRef.current) {
      session.unpublish(publisherRef.current);
      publisherRef.current.destroy();
      publisherRef.current = null;
    }
  }, []);

  return {
    initPublisher,
    publish,
    unpublish,
    publisher: publisherRef.current,
  };
}

export { usePublisher };
