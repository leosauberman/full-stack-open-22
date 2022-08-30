export const Filter = (props) => {
    return (
        <div>
            filter:
            <input
                type="text" placeholder="Filter by name"
                value={props.filter} onChange={props.applyFilter}
            />
        </div>
    );
}