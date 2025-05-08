import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useChallenges } from '@/app/context/ChallengesContext';

interface uploadedDocument {
  name: string;
  mimeType: string;
  size: number;
  uri: string;
}
interface FileUploaderProps{
  onFileUpload: (document: uploadedDocument)=> void;
  setModalVisible:(visible: boolean)=> void;
}
const FileUploader: React.FC<FileUploaderProps> = ({onFileUpload, setModalVisible}) => {
  const [document, setDocument] = useState<uploadedDocument | null>(null);
  const {handleTaskCompletion} = useChallenges();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        multiple: false
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const name = asset.name ?? "Unknown";
        const mimeType = asset.mimeType ?? "Unknown";
        const size = asset.size ?? 0;
        const uri = asset.uri ?? "";
        const doc = {name, mimeType, size, uri};
        setDocument(doc);
        onFileUpload(doc);
        setModalVisible(false);
        handleTaskCompletion("Import 2 new tracks");
      } else {
        console.log("Document selection cancelled.");
      }
    } catch (error) {
      console.log("Error picking documents:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fileUploaderButton} onPress={pickDocument}>
        <Text style={styles.fileUploaderButtonText}>Import local file</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileUploaderButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  fileUploaderButtonText: {
    fontSize: 16,
    textAlign: 'center',
  }
});

export default FileUploader;
