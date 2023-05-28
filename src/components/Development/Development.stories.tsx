import { Meta } from '@storybook/react'
import { Development as Component, DevelopmentProps } from './Development'

// noinspection JSUnusedGlobalSymbols
export default {
	title: 'Development',
	component: Component,
} as Meta<typeof Component>

export const Development = (args: any) => <Component {...args} />

const args: DevelopmentProps = {
}

Development.args = args
