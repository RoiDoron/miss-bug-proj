const { useState, useEffect, useRef } = React

export function BugFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
        console.log(filterByToEdit);
    }


    return <section className="bug-filter">
        <h2>Filter our cars</h2>

        <form onSubmit={onFilter}>
            <label htmlFor="title">title</label>
            <input type="text"
                id="title"
                name="title"
                value={filterByToEdit.title || ''}
                onChange={handleChange}
                placeholder="By title" />

            <label htmlFor="severity">severity</label>
            <input type="number"
                id="severity"
                name="severity"
                value={filterByToEdit.severity || ''}
                onChange={handleChange}
                placeholder="By severity" />

                <select onChange={handleChange} name="labels">
                    <option value="">labels</option>
                    <option value="critical">critical</option>
                    <option value="need-CR">need-CR</option>
                    <option value="dev-branch">dev-branch</option>
                </select>

                <select onChange={handleChange} name="sort">
                    <option value="">sort</option>
                    <option value="title">title</option>
                    <option value="severity">severity</option>
                    <option value="createdAt">createdAt</option>
                </select>

            <button>Filter</button>
        </form>
    </section>
}