import { Center, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import { NewTaskInput } from "./components/NewTaskInput";
import { TaskBox } from "./components/TaskBox";
import { ToggleTheme } from "./components/ToggleTheme";
import { ITask } from "./types/Task";

export const App = () => {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const tasks = JSON.parse(localStorage.getItem('Tasks') || '[]');

    tasks !== '' && setTaskList(tasks);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  function handleAddTask(taskName: string) {
    let newList = [...taskList];

    newList.unshift({
      id: Date.now(),
      name: taskName,
      done: false
    });

    localStorage.setItem('Tasks', JSON.stringify(newList));

    setTaskList(newList);
  };

  return (
    <Flex w="100vw" h="100vh" direction='column'>
      {isLoading ?
        (<Center w='100vw' h='100vh'>
          <Circles
            height="200"
            width="200"
            color="#A0AEC0"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Center>)
        :
        (<>
          <Text
            fontSize='4xl'
            margin="15px auto"
            as='samp'
          >
            TO DO LIST
          </Text>
          <Flex
            w='95%'
            maxWidth='1200px'
            margin='0 auto'
            direction='column'
          >
            <NewTaskInput onEnter={handleAddTask} />
            {taskList.length > 0 &&
              taskList.map((task, index) => (
                <TaskBox
                  key={task.id}
                  task={task}
                  index={index}
                  taskList={taskList}
                  setTaskList={setTaskList}
                />
              ))
            }
          </Flex>
          <ToggleTheme />
        </>)}
    </Flex>
  );
};