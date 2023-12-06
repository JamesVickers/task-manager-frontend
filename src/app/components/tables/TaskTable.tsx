'use client'

import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { ITask } from '@/app/types/interfaces';

const TasksTable = ({ 
    tasks,
    handleSelectionChange,
    handleDelete
  }: { 
    tasks: ITask[];
    handleSelectionChange: ([]: number[] | undefined) => void;
    handleDelete: () => void;
  }): JSX.Element => {

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
    ];

    return (
        <MUIDataTable
            title={'Tasks'}
            data={tasks}
            columns={columns}
            options={{
                filterType: 'checkbox',
                onRowSelectionChange: (_rowsSelectedData, _allRows, rowsSelected) => {
                    handleSelectionChange(rowsSelected);
                },
                onRowsDelete: () => {handleDelete()},
            }}
        />
    )
}

export default TasksTable;
