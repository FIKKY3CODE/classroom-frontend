import React, { useMemo, useState } from 'react'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/refine-ui/data-table/data-table'
import { 
  Select, 
  SelectGroup, 
  SelectItem, 
  SelectValue, 
  SelectContent, 
  SelectTrigger 
} from '@/components/ui/select'
import { DEPARTMENTS_LIST } from '@/constants'
import { CreateButton } from '@/components/refine-ui/buttons/create'
import { Subject } from '@/types'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'

const SubjectsList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const departmentFilters = selectedDepartment === 'all' ? [] : [
    //the object here is for filtering the subjects based on the selected department. It specifies that we want to filter the 'department' field, using the 'eq' (equals) operator, and match it to the value stored in the state variable selectedDepartment.
    {
        field: 'department',
        //as const is a TypeScript feature that tells the compiler to treat the value as a specific type. In this case, it tells TypeScript that the operator is of type 'eq', which is a string literal type. 
        // This helps with type checking and ensures that the value is one of the allowed operators for filtering.
        //string literal is a type that represents a specific string value. In this case, 'eq' is a string literal type that represents the equality operator for filtering.
        operator: 'eq' as const,
        //matching it to the value stored within the state selectedDepartment
        value: selectedDepartment
    }
  ];

 const searchFilters = searchQuery ? [
    {
        field: 'name',
        operator: 'contains' as const,
        value: searchQuery
    }
 ] : []//if no search query is provided, we don't want to apply any filters, so we return an empty array.
  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(() => [
      {
        id: "code", 
        accessorKey: "code", 
        size: 100,
        header: () => <p className="column-title ml-2">Code</p>,
        cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>
      },

      {
        id: "name",
        accessorKey: "name",
        size: 200,
        header: () => <p className="column-title ">Name</p>,
        cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
        //sorting and filtering is automatically handled by the useTable hook, so we don't need to implement it here.
        filterFn: "includesString",//enables text based filtering
      },

      {
        id: "department",
        accessorKey: "department",
        //size is used to set the width of the column, but it is not a hard limit. The column will expand to fit the content if necessary.
        size: 150,
        header: () => <p className="column-title ">Department</p>,
        //variant is from the Badge component, which is a UI component that displays a small badge with a background color and text. The variant prop is used to set the background color of the badge. In this case, we are using the "secondary" variant, which is a light gray color.
        //badge is used to display the department in a visually distinct way, making it easier to identify at a glance.
        cell: ({ getValue }) => <Badge variant="secondary" className="text-foreground">{getValue<string>()}</Badge>,
        
      },

      {
        id: "description",
        accessorKey: "description",
        size: 300,
        header: () => <p className="column-title ">Description</p>,
        cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
      },

    

    ], []),
    refineCoreProps: {
      resource: "subjects",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        //we spread the departmentFilters array to include the filter object if a department is selected, or an empty array if "all" is selected. This allows us to dynamically filter the subjects based on the selected department.
        //the outcome of the spread is that if the selectedDepartment is "all", the filters object will be empty, meaning no filtering will be applied. If a specific department is selected, the filters object will contain a filter for that department, and only subjects from that department will be displayed in the table.
        permanent: [...departmentFilters, ...searchFilters]
      },
      sorters: {
        //initial is used to set the default sorting for the table. In this case, we are sorting by the "id" field in descending order, so that the most recently added subjects appear at the top of the list.
        initial: [
            {field: "id",order: "desc"}
        ]
      },
    }
  })  

//define usetable and filters and it handles all the logic for fetching data and displaying it responsively

  return (
    <ListView>
        <Breadcrumb/>
        <h1 className="page-title">Subjects</h1>
        <div className="intro-row">
            <p>Quick access</p>
            <div className="actions-row">
                <div className="search-field">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="pl-10 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <Select 
                        value={selectedDepartment}
                        onValueChange={setSelectedDepartment}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by department"/>
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">
                                All Departments
                            </SelectItem>
                            {DEPARTMENTS_LIST.map(dept => (
                                <SelectItem key={dept.value} value={dept.value}>
                                    {dept.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>   
                    <CreateButton />
                </div>    
            </div>    
        </div>
        <DataTable table={subjectTable} />
    </ListView>
  )
}

export default SubjectsList