import { IFeedbackImage } from "../components/feedbackImage/index.tsx";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

import NotFoundImage from "../../../shared/assets/imgs/cam-notfound.png";
import NotConnected from "../../../shared/assets/imgs/cam_connected.png";
import PermissionImage from "../../../shared/assets/imgs/cam_permission.png";

/**
 * Custom hook for testing audio and video, which is a technique used to check the functionality of the camera and microphone.
 * @returns {object} An object containing the following:
 * - imageSrc: string, the source of the feedback image displayed when an error occurs.
 * - volume: number, the volume level of the microphone.
 * - errorMessage: string, the error message displayed when an error occurs.
 * - videoRef: RefObject, a reference to the video element used to display the video stream.
 * - getTestMedia: function, a function to start the test of the camera and microphone.
 */
function useTesteAudioVideo() {
    const [imageSrc, setImageSrc] = useState<IFeedbackImage>();
    const [volume, setVolume] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);

    const stopMediaStream = () => {
        if (mediaStreamRef.current) {
            const tracks = mediaStreamRef.current.getTracks();
            tracks.forEach((track) => track.stop());
            mediaStreamRef.current = null;
        }
    };

    async function getTestMedia() {
        setErrorMessage("");
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: {
                    width: { min: 300, ideal: 950, max: 800 },
                    height: { min: 300, ideal: 450, max: 800 },
                },
            })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    videoRef.current.controls = false;
                    mediaStreamRef.current = stream;
                    toast.success("Câmera e microfone funcionando corretamente!");
                }
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);
                analyser.connect(audioContext.destination);

                const updateVolume = () => {
                    const dataArray = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(dataArray);
                    const averageVolume =
                        dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;

                    setVolume(averageVolume);
                };
                setInterval(updateVolume, 100);
            })

            .catch((error) => {
                console.error(`Error: ${error}`);
                switch (error.name) {
                    case "NotAllowedError": {
                        toast.error(
                            "Verifique as permissões de acesso a câmera e microfone no navegador."
                        );
                        setErrorMessage(
                            "Verifique as permissões de acesso a câmera e microfone no navegador."
                        );
                        setImageSrc({ alt: "NotAllowedError", image: PermissionImage });
                        break;
                    }
                    case "NotFoundError": {
                        setErrorMessage(
                            "Verifique se a câmera e o microfone estão conectados."
                        );
                        toast.error(
                            "Verifique se a câmera e o microfone estão conectados."
                        );
                        setImageSrc({ alt: "NotFoundError", image: NotConnected });
                        break;
                    }
                    case "NotReadableError": {
                        setErrorMessage(
                            "A câmera ou microfone não foram encontrados, verifique se estão sendo usados em outro sistema."
                        );
                        toast.error(
                            "A câmera ou microfone não foram encontrados, verifique se estão sendo usados em outro sistema."
                        );
                        setImageSrc({ alt: "NotReadableError", image: NotFoundImage });
                        break;
                    }
                    default: {
                        console.error(`Error: ${error}`);
                    }
                }
                return false;
            });
    }

    useEffect(() => {
        getTestMedia();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            stopMediaStream();
        };
    }, []);

    return {
        imageSrc,
        volume,
        errorMessage,
        videoRef,
        getTestMedia,
    };
}

export { useTesteAudioVideo };
