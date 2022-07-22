import { faker } from '@faker-js/faker'
import { Story, Meta } from '@storybook/react'
import { PostItem, PostItemProps } from './post-item'

export default {
  title: 'components/PostItem',
  component: PostItem,
} as Meta

export const Default: Story<PostItemProps> = (args) => <PostItem {...args} />

Default.args = {
  post: {
    id: faker.datatype.uuid(),
    title: faker.lorem.word(),
    slug: faker.lorem.words(),
    writer: {
      username: faker.internet.userName(),
    },
  },
}
