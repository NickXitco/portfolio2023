import { Meta } from '@storybook/react'
import { AboutMe as Component, AboutMeProps } from './AboutMe'

// noinspection JSUnusedGlobalSymbols
export default {
	title: 'AboutMe',
	component: Component,
} as Meta<typeof Component>

export const AboutMe = (args: any) => <Component {...args} />

const args: AboutMeProps = {
}

AboutMe.args = args
