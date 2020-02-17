import React from 'react';
import { Icon, Input, Grid } from 'semantic-ui-react';

function SearchBox() {
    return (
        <Grid centered>
            <Grid.Column mobile={13} tablet={8} computer={8}>
                <Input className="my-3" icon placeholder='ค้นหาที่จอดรถ...' fluid>
                    <input className="border-0 shadow" style={{ borderRadius: '12px' }} />
                    <Icon name='search link' />
                </Input>
            </Grid.Column>
        </Grid>
    );
}

export default SearchBox;