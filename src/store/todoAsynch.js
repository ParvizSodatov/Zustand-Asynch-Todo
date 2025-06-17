import axios from 'axios'
import { create } from 'zustand'

export const useTodoAsynch = create((set, get) => ({
	data: [],
	getCategory: async () => {
		try {
			let { data } = await axios.get(
				'https://to-dos-api.softclub.tj/api/to-dos'
			)
			set(() => ({ data: data.data }))
		} catch (error) {
			console.log(error)
		}
	},
	deletCategory: async id => {
		try {
			await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos?id=${id}`)
			get().getCategory()
		} catch (error) {
			console.log(error)
		}
	},
	completedCategory: async id => {
		try {
			await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`)
			get().getCategory()
		} catch (error) {
			console.log(error)
		}
	},
	editCategory: async user => {
		try {
			await axios.put('https://to-dos-api.softclub.tj/api/to-dos', user)
			get().getCategory()
		} catch (error) {
			console.log(error)
		}
	},
	addCategory: async formData => {
		try {
			await axios.post('https://to-dos-api.softclub.tj/api/to-dos', formData)
			get().getCategory()
		} catch (error) {
			console.log(error)
		}
	},
	deletById: async id => {
		try {
			await axios.delete(
				`https://to-dos-api.softclub.tj/api/to-dos/images/${id}`
			)
			get().getCategory()
		} catch (error) {
			console.log(error)
		}
	},
	addImageByIdForUser: async props => {
		try {
			await axios.post(
				`https://to-dos-api.softclub.tj/api/to-dos/${props.addIdById}/images`,
				props.formData
			)
			get().getCategory()
		} catch (error) {
			console.log(error)
		}
	},
}))
