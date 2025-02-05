import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const TaskList = ({ tasks, onToggleTask }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onToggleTask(item.id)}>
          <Text style={[styles.task, item.done && styles.done]}>{item.text}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  task: {
    fontSize: 18,
    padding: 10,
  },
  done: {
    textDecorationLine: 'line-through',
  },
});

export default TaskList;
