interface IconPhotoProps {
    onPress?: () => void
}

const IconPhoto: React.FC<IconPhotoProps> = ({ onPress }) => {
    return (
        <div className='p-[10px] bg-gray-300 justify-center items-center flex' onClick={onPress}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2" />
                <circle
                    cx="8.5"
                    cy="8.5"
                    r="1.5" />
                <path
                    d="M20.4 14.5L16 10 4 20" />
            </svg>
        </div>
    )
}

export default IconPhoto