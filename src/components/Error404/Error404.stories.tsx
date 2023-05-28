import { Meta } from '@storybook/react'
import { Error404 as Component, Error404Props } from './Error404'

// noinspection JSUnusedGlobalSymbols
export default {
	title: 'Error404',
	component: Component,
} as Meta<typeof Component>

export const Error404 = (args: any) => <Component {...args} />

const args: Error404Props = {
}

Error404.args = args
