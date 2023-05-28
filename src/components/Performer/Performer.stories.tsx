import { Meta } from '@storybook/react'
import { Performer as Component, PerformerProps } from './Performer'

// noinspection JSUnusedGlobalSymbols
export default {
	title: 'Performer',
	component: Component,
} as Meta<typeof Component>

export const Performer = (args: any) => <Component {...args} />

const args: PerformerProps = {
}

Performer.args = args
