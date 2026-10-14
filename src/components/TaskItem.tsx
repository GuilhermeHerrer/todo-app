import { Task } from "@/types";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface TaskItemProps {
  task: Task;
  onRemove: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TaskItem({ task, onRemove, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    onEdit(task.id, editedText);
    setIsEditing(false);
  };

  return (
    <View style={styles.taskCard}>
      {isEditing ? (
        <TextInput style={styles.editInput} value={editedText} onChangeText={setEditedText} autoFocus />
      ) : (
        <Text style={styles.taskText}>{task.text}</Text>
      )}
      <View style={styles.actionContainer}>
        {isEditing ? (
          <TouchableOpacity style={[styles.saveButton, styles.actionButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>V</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>E</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => onRemove(task.id)} style={[styles.deleteButton, styles.actionButton]}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  taskText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    borderBottomColor: "#007bff",
    borderBottomWidth: 1,
    padding: 0,
    marginRight: 10,
  },
  actionContainer: {
    flexDirection: "row",
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#ff9500",
  },
  saveButton: {
    backgroundColor: "#34c759",
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
