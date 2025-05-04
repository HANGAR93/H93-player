const { faker } = require('@faker-js/faker')

const dbMock = require('./')

describe('@makeitrealcamp/db-mock', () => {
  beforeEach(() => {
    dbMock.reset()
  })

  test('should insert a user', () => {
    // Arrange
    const fullName = faker.name.fullName();
    const user = { name: fullName }

    // Act
    const result = dbMock.insert(user)

    // Assert
    expect(result).toEqual({ ...user, id: 1  })
  })

  test('should find a user by id', () => {
    // Arrange
    const fullName = faker.name.fullName();
    const user = { name: fullName}
    dbMock.insert(user)

    // Act
    const result = dbMock.findById(1)

    // Assert
    expect(result).toEqual({ ...user, id: 1 })
  })

  test('should find all users', () => {
    // Arrange
    const user1 = { name: faker.name.fullName() }
    const user2 = { name: faker.name.fullName() }
    dbMock.insert(user1)
    dbMock.insert(user2)

    // Act
    const result = dbMock.findAll()

    // Assert
    expect(result).toEqual([
      { ...user1, id: 1 },
      { ...user2, id: 2 },
    ])

  })

  test('should update a user', () => {
    // Arrange
    const user = { name: faker.name.fullName() }
    const updatedUser = { id: 1, name: faker.name.fullName() }
    dbMock.insert(user)

    // Act
    const result = dbMock.update(updatedUser)

    // Assert
    expect(result).toEqual(updatedUser)
  })

  test('should remove a user', () => {
    // Arrange
    const user = { name: faker.name.fullName() }
    dbMock.insert(user)

    // Act
    dbMock.remove(1)

    // Assert
    expect(dbMock.findAll()).toEqual([])
  })
})
