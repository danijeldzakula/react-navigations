import Igtv from './instagram-igtv/Igtv';
import Posts from './instagram-posts/Posts';
import Reels from './instagram-reels/Reels';
import Story from './instagram-story/Story';

const instagramTimeLine = {
    Igtv,
    Posts,
    Reels,
    Story
};

export default instagramTimeLine;

/*
    import InstagramTimeLine from "./components/instagram/InstagramTimeLine";

    <InstagramTimeLine.Igtv />
    <InstagramTimeLine.Posts />
    <InstagramTimeLine.Reels />
    <InstagramTimeLine.Story />
*/