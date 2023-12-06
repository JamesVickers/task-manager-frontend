'use client'

import React, { ChangeEvent, useState } from 'react';
import MUIDataTable, { MUIDataTableMeta } from 'mui-datatables';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ITask } from '@/app/types/interfaces';
import useForm from '../../utils/hooks/useForm';

const TasksTable = ({
    tasks,
    handleSelectionChange,
    handleDelete,
    handleEditSave
}: {
    tasks: ITask[];
    handleSelectionChange: ([]: number[] | undefined) => void;
    handleDelete: () => void;
    handleEditSave: (editedTask: ITask) => void;
}): JSX.Element => {
    // State 
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [editedRowData, setEditedRowData] = useState([]);
    const [taskInEdit, setTaskInEdit] = useState<ITask | null>(null);

    const { inputs, handleChange, resetForm } = useForm({
        assignee: taskInEdit?.assignee ? taskInEdit.assignee : '',
        description: taskInEdit?.description ? taskInEdit.description : '',
        priority: taskInEdit?.priority ? taskInEdit.priority : '',
    });

    // Handlers
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let parsedValue = name === 'priority' ? parseInt(value) : value;
        setTaskInEdit((prevTask) => {
            if (!prevTask) return null;
            return {
                ...prevTask,
                [name]: parsedValue,
            };
        });
    };

    const handleEdit = (itemIndex: number) => {
        const task = tasks[itemIndex];
        setTaskInEdit(task)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTaskInEdit(null)
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, taskInEdit: ITask) => {
        e.preventDefault();
        handleEditSave(taskInEdit);
        handleClose()
    };

    const columns = [
        {
            name: '_id',
            label: 'ID',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'assignee',
            label: 'Assignee',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'description',
            label: 'Description',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'priority',
            label: 'Priority',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'createdAt',
            label: 'Created Date',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'updatedAt',
            label: 'Updated Date',
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: '',
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (_value: any, tableMeta: MUIDataTableMeta, _updateValue: (value: any) => void) => {
                    return (
                        <IconButton onClick={() => handleEdit(tableMeta.rowIndex)}>
                            <EditIcon />
                        </IconButton>

                    );
                }
            }
        },
    ];

    return (
        <>
            <MUIDataTable
                title={'Tasks'}
                data={tasks}
                columns={columns}
                options={{
                    filterType: 'checkbox',
                    onRowSelectionChange: (_rowsSelectedData, _allRows, rowsSelected) => {
                        handleSelectionChange(rowsSelected);
                    },
                    onRowsDelete: () => { handleDelete() },
                }}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    {taskInEdit && (
                        <form onSubmit={(e) => handleSubmit(e, taskInEdit)}>
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
                            <DialogActions>
                                <Button onClick={handleClose} variant='contained' color="error">
                                    Cancel
                                </Button>
                                <Button type='submit' value='Submit' variant='contained' color="primary">
                                    Save
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </DialogContent>
            </Dialog></>
    )
}

export default TasksTable;
