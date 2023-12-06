'use client'

import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

const TaskInputFields = ({
    inputs,
    handleInputChange,
}: {
    inputs: any;
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}): JSX.Element => {
    return (
        <>
            <TextField
                id='assignee'
                name='assignee'
                label='Assignee'
                type='string'
                value={inputs.assignee}
                onChange={(e) => handleInputChange(e)}
                fullWidth
                margin='normal'
            />
            <TextField
                id='description'
                name='description'
                label='Description'
                type='string'
                value={inputs.description}
                onChange={(e) => handleInputChange(e)}
                fullWidth
                margin='normal'
            />
            <TextField
                id='priority'
                name='priority'
                label='Priority'
                type='number'
                value={inputs.priority}
                onChange={(e) => handleInputChange(e)}
                fullWidth
                margin='normal'
                inputProps={{
                    min: 1,
                    max: 3,
                }}
            />
        </>
    )
}

export default TaskInputFields;
