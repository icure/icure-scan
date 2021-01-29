import { first } from 'lodash';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import DocumentListItem from '../components/DocumentListItem';
import useDocument from '../hooks/useDocument';

const ContactListItem = ({ patient, contact, onSelection }) => {
  const { fetchContactDocumentIds } = useDocument();
  return (
    <ListItem onPress={onSelection} bottomDivider>
      <DocumentListItem
        patientId={patient.id}
        documentId={first(fetchContactDocumentIds(contact))}
      ></DocumentListItem>
      <ListItem.Content>
        <ListItem.Title>
          Contact du {moment(contact.created).format('DD/MM/YYYY')}
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text style={styles.subTitle}>
            {fetchContactDocumentIds(contact).length} document(s)
          </Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 14,
  },
});

export default ContactListItem;
