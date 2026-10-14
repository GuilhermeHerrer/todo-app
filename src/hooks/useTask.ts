import { Task } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const TASKS_KEYS = "@task_key";

export function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(TASKS_KEYS);
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setIsInitialLoad(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (isInitialLoad) return;

    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TASKS_KEYS, JSON.stringify(tasks));
      } catch (error) {
        console.error("Erro ao salvar tarefas:", error);
      }
    };
    saveTasks();
  }, [tasks, isInitialLoad]);

  const addTasks = (text: string) => {
    if (text.trim() === "") return;
    const newTask: Task = {
      id: Date.now().toString(),
      text,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));
  };

  const editTask = (id: string, newText: string) => {
    if (newText.trim() === "") return;

    setTasks((prevTasks) => prevTasks.map((tasks) => (tasks.id === id ? { ...tasks, text: newText } : tasks)));
  };

  return {
    tasks,
    addTasks,
    removeTask,
    editTask,
  };
}
