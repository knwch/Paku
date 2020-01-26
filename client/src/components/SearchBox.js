import React from 'react';

function SearchBox() {
    return (
        <div className="search-main">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="ค้นหาที่จอดรถของคุณ" />
                <div className="input-group-append">
                    <button className="btn btn-secondary" type="button">
                        <a>Go</a>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchBox;