import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await AsyncStorage.getItem('tasks');
        if (tasksData) {
          setTasks(JSON.parse(tasksData));
        }
      } catch (error) {
        console.error("Failed to load tasks", error);
      }
    };
    loadTasks();
  }, []);

  const addTask = (taskText) => {
    const newTask = { id: Date.now(), text: taskText, done: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks", error);
    }
  };

  const clearTasks = async () => {
    try {
      await AsyncStorage.removeItem('tasks');
      setTasks([]);
    } catch (error) {
      console.error("Failed to clear tasks", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Todo list</Text>
      <TaskInput onAddTask={addTask} />
      <TaskList tasks={tasks} onToggleTask={toggleTask} />
      <Button title="Clear All Tasks" onPress={clearTasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  appTitle: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});
