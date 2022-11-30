import { faker } from '@faker-js/faker'
// import { faker } from '@faker-js/faker/locale/de';

export const User = []

export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past()
  }
}

export function getUserList(num: number) {
  for (let i = 0; i < num; i++) {
    User.push(createRandomUser())
  }

  return User
}

export function fetchMarkDown() {
  return fetch('https://raw.githubusercontent.com/solidjs/solid/master/README.md').then((res) =>
    res.text()
  )
}
