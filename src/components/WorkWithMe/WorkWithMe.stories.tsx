import { Meta } from '@storybook/react'
import { WorkWithMe as Component, WorkWithMeProps } from './WorkWithMe'

// noinspection JSUnusedGlobalSymbols
export default {
	title: 'WorkWithMe',
	component: Component,
} as Meta<typeof Component>

export const WorkWithMe = (args: any) => <Component {...args} />

const args: WorkWithMeProps = {
}

WorkWithMe.args = args
