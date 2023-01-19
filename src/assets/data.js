export const usersData = [
  {
    id: '1',
    firstName: 'Perica',
    lastName: 'Peric',
    company: { id: '1', label: 'Merkle' },
    dateOfBirth: '01.02.1995',
    position: { id: 1, label: 'Frontend' },
    number: '111222333444'
  },
  {
    id: '2',
    firstName: 'Filip',
    lastName: 'Filipovic',
    company: { id: '2', label: 'Space-Jam' },
    dateOfBirth: '02.02.1990',
    position: { id: 2, label: 'Backend' },
    number: '111222333444'
  },
  {
    id: '3',
    firstName: 'Kica',
    lastName: 'Papagaj',
    company: { id: '2', label: 'Space-Jam' },
    dateOfBirth: '02.01.1993',
    position: { id: 3, label: 'Sideend?' },
    number: '111222333444'
  }
]

export const companiesData = [
  {
    id: '1',
    label: 'Merkle',
    city: 'Belgrade',
    country: 'Serbia',
    users: [
      {
        id: '1',
        firstName: 'Perica',
        lastName: 'Peric',
        company: { id: '1', label: 'Merkle' },
        dateOfBirth: '01.02.1995',
        position: { id: 1, label: 'Frontend' },
        number: '111222333444'
      }
    ]
  },
  {
    id: '2',
    label: 'Space-Jam',
    city: 'Outertown',
    country: 'Outerworld',
    users: [
      {
        id: '2',
        firstName: 'Filip',
        lastName: 'Filipovic',
        company: { id: '2', label: 'Space-jam' },
        dateOfBirth: '02.02.1990',
        position: { id: 2, label: 'Backend' },
        number: '111222333444'
      },
      {
        id: '3',
        firstName: 'Kica',
        lastName: 'Papagaj',
        company: { id: '2', label: 'Space-jam' },
        dateOfBirth: '02.01.1993',
        position: { id: 3, label: 'Sideend?' },
        number: '111222333444'
      }
    ]
  },
  {
    id: '3',
    label: 'Fiverr',
    city: 'Goa',
    country: 'India',
    users: []
  },
  {
    id: '4',
    label: 'Airtable',
    city: 'New York city',
    country: 'USA',
    users: []
  }
]