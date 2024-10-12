import { RiseLoader } from 'react-spinners';
import useTheme from '../Hooks/useTheme';

const Loading = () => {
    const { styleDarkHome } = useTheme()
    return (
        <div className={`absolute inset-0 flex items-center justify-center ${styleDarkHome}`}>
            <RiseLoader size={10} />

        </div>
    );
};

export default Loading;
