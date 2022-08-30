export const Notification = (props) => {
    if (props.message === null) {
        return null
    }

    return (
        <div className={props.type === 'success' ? 'alert success' : 'alert error'}>
            {props.message}
        </div>
    )
}