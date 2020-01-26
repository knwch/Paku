import React from 'react';
import { Icon, Input } from 'semantic-ui-react';

function SearchBox() {
    return (
        <Input icon placeholder='ค้นหาที่จอดรถของคุณ...'>
            <input />
            <Icon name='search' />
        </Input>
    );
}

export default SearchBox;