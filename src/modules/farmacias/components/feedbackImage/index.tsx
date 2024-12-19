export interface IFeedbackImage {
    image?: string;
    alt?: string;
}

function FeedbackImage({ image, alt }: IFeedbackImage) {
    return (
        <div className="flex w-full justify-center items-center">
            <img src={image} alt={alt} className="w-[750px] h-[550px]" />
        </div>
    );
}

export { FeedbackImage };

