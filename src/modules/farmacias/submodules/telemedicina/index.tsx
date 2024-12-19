import Logo from "@assets/imgs/logo amparo_page-0001 1.png";
import { cn } from "@components/lib/utils";
import { TelemedicinaContext } from "@modules/farmacias/context/telemedicinaContext";
import { usePublisher } from "@modules/farmacias/hooks/usePublisher";
import { useSubscriber } from "@modules/farmacias/hooks/useSubscriber";
import { Mic, MicOff, Video, VideoOff, Volume2, VolumeOff } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const TelemedicinaPage = () => {
	const [camIsActive, setCamIsActive] = useState(true);
	const [micIsActive, setMicIsActive] = useState(true);
	const [subscribeAudioIsActive, setSubscribeAudioIsActive] = useState(true);

	const { createSession, session, destroySession, connected } = useContext(TelemedicinaContext);
	const { initPublisher, publish, unpublish, publisher } = usePublisher();
	const { initSubscriber, unsubscribe, subscriber } = useSubscriber();

	const publisherRef = useRef<HTMLDivElement | null>(null);
	const subscriberRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		(async () => {
			try {
				await createSession();

				if (publisherRef.current) {
					initPublisher({
						containerId: publisherRef.current.id,
						options: { publishAudio: micIsActive, publishVideo: camIsActive },
					});
				}

				if (session && publisher) {
					publish(session);
				}
			} catch (error) {
				toast.error("Erro ao conectar à sessão");
			}
		})();

		return () => {
			if (session && publisher) unpublish(session);
			destroySession();
		};
	}, [createSession, destroySession, initPublisher, publish, unpublish, session]);

	useEffect(() => {
		if (session && subscriberRef.current) {
			session.on("streamCreated", async (event) => {
				await initSubscriber(
					{ containerId: "video_subscriber", options: { subscribeToAudio: true, subscribeToVideo: true } },
					session,
					event.stream
				);
			});

			session.on("streamDestroyed", (event) => {
				if (subscriber && event.stream.streamId === subscriber.stream?.streamId) {
					unsubscribe(session);
				}
			});
		}

		return () => {
			if (session && subscriber) {
				session.off("streamCreated");
				session.off("streamDestroyed");
			}
			destroySession();
		};
	}, [session, initSubscriber, unsubscribe]);

	const handleToggleCam = () => {
		setCamIsActive((prev) => !prev);
		if (publisher) publisher.publishVideo(!camIsActive);
	};

	const handleToggleMic = () => {
		setMicIsActive((prev) => !prev);
		if (publisher) publisher.publishAudio(!micIsActive);
	};

	const handleToggleSubscriberAudio = () => {
		setSubscribeAudioIsActive((prev) => !prev);
		if (subscriber) subscriber.subscribeToAudio(!subscribeAudioIsActive);
	};

	return (
		<div className="w-[100%] h-[100vh] bg-primary">
			<header className="w-full h-[8%] flex items-center justify-between p-6">
				<img src={Logo} alt="Logo" className="w-48 mt-6 mb-3" />
				<h1 className="text-2xl font-bold text-white">Telemedicina</h1>
			</header>
			<section className="m-auto w-full h-[90%] gap-3 flex p-6">
				<div className="flex flex-col gap-2 w-[30%] h-full justify-start items-center">
					<div className="flex w-full h-96 bg-white rounded-3xl shadow-2xl overflow-hidden">
						<div className={cn("w-full h-full justify-center items-center", !connected ? "flex" : "hidden")}>
							<div
								className={cn("w-9 h-9 border-4 border-solid border-gray-200 border-l-transparent rounded-full animate-spin")}
							></div>
						</div>
						<div id="video_publisher" className={cn("w-full min-h-full", connected ? "block" : "hidden")} ref={publisherRef} />
					</div>
					<div className="z-50 flex items-end justify-center">
						<div className="max-w-1/4 flex items-center justify-center gap-4 p-2 bg-white rounded-full shadow-2xl hover:opacity-100 transition">
							<button
								onClick={handleToggleCam}
								disabled={!connected}
								className="px-3 py-3 disabled:cursor-wait bg-white hover:bg-zinc-100 transition rounded-full shadow-md text-white border border-zinc-200 data-[is-active=false]:bg-zinc-300/90"
							>
								{camIsActive ? (
									<Video className="text-xl text-zinc-500 hover:text-primary disabled:text-zinc-500" />
								) : (
									<VideoOff className="text-xl text-zinc-500 hover:text-primary disabled:text-zinc-500" />
								)}
							</button>
							<button
								onClick={handleToggleMic}
								disabled={!connected}
								className="px-3 py-3 disabled:cursor-wait bg-white hover:bg-zinc-100 transition rounded-full shadow-md text-white border border-zinc-200 data-[is-active=false]:bg-zinc-300/90"
							>
								{micIsActive ? (
									<Mic className="text-xl text-zinc-500 hover:text-primary disabled:text-zinc-500" />
								) : (
									<MicOff className="text-xl text-zinc-500 hover:text-primary disabled:text-zinc-500" />
								)}
							</button>
						</div>
					</div>
				</div>
				<div className="flex justify-center w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
					<div className={cn("w-full h-full justify-center items-center", !connected ? "flex" : "hidden")}>
						<div
							className={cn("w-9 h-9 border-4 border-solid border-gray-200 border-l-transparent rounded-full animate-spin")}
						></div>
					</div>
					<div id="video_subscriber" className={cn("w-full min-h-full", connected ? "block" : "hidden")} ref={subscriberRef} />
					<button
						onClick={handleToggleSubscriberAudio}
						disabled={!connected}
						className="fixed right-6 m-3 px-3 py-3 disabled:cursor-wait bg-white hover:bg-zinc-100 transition rounded-full shadow-md text-white border border-zinc-200 data-[is-active=false]:bg-zinc-300/90"
					>
						{subscribeAudioIsActive ? (
							<Volume2 className="text-xl text-zinc-500 hover:text-primary disabled:text-zinc-500" />
						) : (
							<VolumeOff className="text-xl text-zinc-500 hover:text-primary disabled:text-zinc-500" />
						)}
					</button>
				</div>
			</section>
		</div>
	);
};

export { TelemedicinaPage };


