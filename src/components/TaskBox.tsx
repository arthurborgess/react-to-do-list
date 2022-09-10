import { DeleteIcon } from "@chakra-ui/icons";
import { Flex, Checkbox, useColorMode, Button } from "@chakra-ui/react";
import { useState } from "react";
import { ITask } from "../types/Task";

type Props = {
    task: ITask;
    index: number;
    taskList: ITask[];
    setTaskList: (value: ITask[] | ((prevVar: ITask[]) => ITask[])) => void;
};

export const TaskBox = ({ task, index, taskList, setTaskList }: Props) => {
    const [isChecked, setIsChecked] = useState(task.done);
    const [isLoading, setIsLoading] = useState(false);
    const { colorMode } = useColorMode();

    function toggleTaskDone(event: React.ChangeEvent<HTMLInputElement>) {
        setIsChecked(event.target.checked);

        let currentTasks = taskList;
        currentTasks[index].done = !currentTasks[index].done;

        setTaskList(currentTasks);
        localStorage.setItem('Tasks', JSON.stringify(taskList));
    };

    function handleDeleteTask(taskId: number) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setIsLoading(true);

            setTimeout(() => {
                let newList = taskList.filter(task => task.id !== taskId);
                setTaskList(newList);

                localStorage.setItem('Tasks', JSON.stringify(newList));

                setIsLoading(false);
            }, 1500);
        }
    };

    return (
        <Flex
            w='100%'
            maxW='1200px'
            justify='space-between'
            align="center"
            h='50px'
            margin='1px auto'
            borderRadius='5px'
            padding="0 15px"
            bgColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        >
            <Checkbox
                size='lg'
                borderColor={colorMode === 'light' ? 'gray.400' : 'gray.600'}
                textDecoration={isChecked ? 'line-through' : 'initial'}
                as={isChecked ? 'i' : 'abbr'}
                isChecked={isChecked}
                onChange={toggleTaskDone}
            >{task.name}</Checkbox>
            <Button isLoading={isLoading} onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
            </Button>
        </Flex>
    );
};