import React, { Component } from "react";
import ContactForm from "../contactForm/ContactForm";
import Section from "../section/Section";
import ContactList from "../contactList/ContactList";
import { v4 as uuidv4 } from "uuid";
import Filter from "../Filter/Filter";
import css from "./App.module.css";

import contactsArray from "../../data/Contacts.json";

class App extends Component {
  state = {
    contacts: contactsArray,
    filter: "",
  };

  addContact = (name, number) => {
    if (this.state.contacts.some((element) => element.name === name)) {
      console.log(alert(`${name} is already in contacts`));
      return;
    }

    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  onChangeFilter = (event) => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  getFilteredContacts = () => {
    const filter = this.state.filter.toLowerCase();

    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={css.container}>
        <Section title="Phonebook">
          <ContactForm addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          {!this.state.contacts.length ? (
            <></>
          ) : (
            <>
              <Filter
                value={this.state.filter}
                onChange={this.onChangeFilter}
              />
              <ContactList
                contacts={filteredContacts}
                deleteContact={this.deleteContact}
              />
            </>
          )}
        </Section>
      </div>
    );
  }
}

export default App;
