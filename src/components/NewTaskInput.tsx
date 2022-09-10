import { Input, useColorMode } from "@chakra-ui/react";
import { useState } from "react";

export const NewTaskInput = ({ onEnter }: { onEnter: (taskName: string) => void }) => {
    const { colorMode } = useColorMode();
    const [task, setTask] = useState('');

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if ((event.key === 'Enter' || event.key === 'NumpadEnter') && task !== '') {
            onEnter(task.charAt(0).toUpperCase() + task.slice(1));
            setTask('');
        }
    }

    return (
        <Input
            h='50px'
            marginBottom='40px'
            focusBorderColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            variant='filled'
            placeholder='Add a new task...'
            value={task}
            onChange={e => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
}