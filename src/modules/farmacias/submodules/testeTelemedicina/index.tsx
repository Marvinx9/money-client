import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { FeedbackImage } from "@modules/farmacias/components/feedbackImage";
import { FarmaciasLayout } from "@modules/farmacias/components/layout"
import { useTesteAudioVideo } from "@modules/farmacias/hooks/useTesteTelemedicina"
import { FiMic } from "react-icons/fi";
import { PiArrowClockwiseBold } from "react-icons/pi";

const TesteTelemedicinaPage = () => {
    const { imageSrc, videoRef, errorMessage, volume, getTestMedia } = useTesteAudioVideo();

    return (
        <FarmaciasLayout>
            <Card className="w-full flex flex-col h-full justify-center border-none shadow-none">
                <CardContent>
                    <div className="flex justify-end pt-8 pr-8">
                        <Button onClick={() => getTestMedia()}>
                            <PiArrowClockwiseBold />
                            Atualizar
                        </Button>
                    </div>
                    <div>
                        {errorMessage.length > 1 ? (
                            <div className="w-full text-center mt-10">
                                <FeedbackImage alt={imageSrc?.alt} image={imageSrc?.image} />
                                <p className="font-semibold text-2xl text-gray-700">
                                    {errorMessage}
                                </p>
                            </div>
                        ) : (
                            <div className="w-full h-full flex justify-center">
                                <div className="relative left-20">
                                    <p className="text-2xl italic text-tertiary">
                                        Verifique se você está sendo visto e se ouvindo corretamente.
                                    </p>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="max-w-100 rounded-lg border-2 border-tertiary"
                                    />
                                </div>
                                <div className="flex flex-row-reverse items-center w-64 gap-2 rotate-[270deg]">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        className="w-full accent-[#0ea5e9] [&::-webkit-slider-runnable-track]:bg-[#fff]/60"
                                        disabled
                                    />
                                    <FiMic size={30} className="rotate-90 opacity-50" />
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </FarmaciasLayout>
    )
}

export { TesteTelemedicinaPage }