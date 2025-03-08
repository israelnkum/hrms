interface Props {
    title?: string,
    text?: string,
}
const Loading = ({ title = 'Please Wait', text = 'We are setting up your workspace' }: Props) => {

    return (
        <div className={'flex flex-col items-center justify-center h-screen'}>
            <p>{title}</p>
            <p>{text}</p>
        </div>
    )
}

export default Loading
