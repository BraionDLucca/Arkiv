import "./YoutubeURLContent.css";
import YouTube from "react-youtube"

function YoutubeURLContent({ content, markContentAccessed }) {

    const url = content.value

    function getYouTubeVideoId(url) {
        try {
            const parsedUrl = new URL(url);

            if (parsedUrl.hostname === "youtu.be") {
                return parsedUrl.pathname.slice(1);
            }

            if (
                parsedUrl.hostname === "www.youtube.com" ||
                parsedUrl.hostname === "youtube.com"
            ) {
                if (parsedUrl.pathname === "/watch") {
                    return parsedUrl.searchParams.get("v");
                }

                if (parsedUrl.pathname.startsWith("/shorts/")) {
                    return parsedUrl.pathname.split("/")[2];
                }

                if (parsedUrl.pathname.startsWith("/embed/")) {
                    return parsedUrl.pathname.split("/")[2];
                }
            }

            return null;
        } catch {
            return null;
        }
    }

    return (
        <div className="youtube-video-container">
            <YouTube
                videoId={getYouTubeVideoId(url)}
                title="Vídeo do YouTube"
                iframeClassName="youtube-video"
                onEnd={() => markContentAccessed(content)}
            />
        </div>
    );
}

export default YoutubeURLContent;