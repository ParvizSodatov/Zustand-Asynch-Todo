import { useEffect, useState } from 'react'
import { useTodoAsynch } from './store/todoAsynch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
export default function App() {
	const {
		data,
		getCategory,
		deletCategory,
		completedCategory,
		editCategory,
		addCategory,
		deletById,
		addImageByIdForUser,
	} = useTodoAsynch()

	// edit
	const [openEdit, setOpenEdit] = useState(false)
	const [editName, setEditName] = useState('')
	const [editDesc, setEditDesc] = useState('')
	const [idx, setIdx] = useState('')

	// add
	const [openAdd, setOpenAdd] = useState(false)
	const [addName, setAddName] = useState('')
	const [addDesc, setAddDesc] = useState('')
	const [addImage, setAddImage] = useState(null)

	// addbyId
	const [openAddImageById, setOpenAddImageById] = useState(false)
	const [addIdById, setAddIdById] = useState(null)
	const [addImageById, setAddImageById] = useState('')

	const handleAddImageByIdClickOpen = id => {
		setOpenAddImageById(true)
		setAddIdById(id)
	}
	const handleAddImageByIdClose = () => {
		setOpenAddImageById(false)
	}

	const handleAddImageById = e => {
		setAddImageById(e.target.files)
	}

	const handleEditClickOpen = row => {
		setOpenEdit(true)
		setEditName(row.name)
		setEditDesc(row.description)
		setIdx(row.id)
	}
	function handleEdit() {
		let newEditCatecory = {
			id: idx,
			name: editName,
			description: editDesc,
		}
		editCategory(newEditCatecory)
	}
	const handleEditClose = () => {
		setOpenEdit(false)
	}
	const handleAddClickOpen = () => {
		setOpenAdd(true)
	}
	const handleAddClose = () => {
		setOpenAdd(false)
	}

	const handleImageAdd = e => {
		setAddImage(e.target.files)
	}
	useEffect(() => {
		getCategory()
	}, [])
	return (
		<>
			<Button variant='outlined' onClick={handleAddClickOpen}></Button>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align='center'>Image</TableCell>
							<TableCell align='center'>Name</TableCell>
							<TableCell align='center'>Description</TableCell>
							<TableCell align='center'>Status</TableCell>
							<TableCell align='center'>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map(row => (
							<TableRow
								key={row.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{row.id}
								</TableCell>
								<TableCell align='center'>
									{row.images.map(el => (
										<div>
											<div
												key={el.id}
												style={{
													display: 'flex',
													gap: '10px',
													alignItems: 'center',
												}}
											>
												<img
													style={{
														width: '75px',
														borderRadius: '100px',
														height: '75px',
													}}
													src={
														'https://to-dos-api.softclub.tj/images/' +
														el.imageName
													}
													alt=''
												/>
												<button onClick={() => deletById(el.id)}>
													<RemoveCircleIcon color='error' />
												</button>
											</div>
										</div>
									))}
								</TableCell>
								<TableCell align='center'>{row.name}</TableCell>
								<TableCell align='center'>{row.description}</TableCell>
								<TableCell align='center'>
									{row.isCompleted ? 'Active' : 'Inactive'}
								</TableCell>
								<TableCell align='center'>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center',
											gap: '10px',
											alignItems: 'center',
										}}
									>
										<button onClick={() => handleAddImageByIdClickOpen(row.id)}>
											<CameraAltIcon style={{ color: 'orange' }} />
										</button>
										<button onClick={() => deletCategory(row.id)}>delet</button>
										<button onClick={() => handleEditClickOpen(row)}>
											edit
										</button>
										<input
											onClick={() => completedCategory(row.id)}
											type='checkbox'
											checked={row.isCompleted}
										/>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* editModal */}
			<Dialog
				open={openEdit}
				onClose={handleEditClose}
				slotProps={{
					paper: {
						component: 'form',
						onSubmit: event => {
							event.preventDefault()
							const formData = new FormData(event.currentTarget)
							const formJson = Object.fromEntries(formData.entries())
							const email = formJson.email
							console.log(email)
							handleEditClose()
						},
					},
				}}
			>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='name'
						label='Email Address'
						type='text'
						value={editName}
						onChange={e => setEditName(e.target.value)}
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='name'
						label='EditDesc'
						type='text'
						value={editDesc}
						onChange={e => setEditDesc(e.target.value)}
						fullWidth
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleEditClose}>Cancel</Button>
					<Button type='submit' onClick={handleEdit}>
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>

			{/* addCategoryModal */}
			<Dialog
				open={openAdd}
				onClose={handleAddClose}
				slotProps={{
					paper: {
						component: 'form',
						onSubmit: event => {
							event.preventDefault()
							const formData = new FormData()
							formData.append('Name', addName)
							formData.append('Description', addDesc)
							for (let i = 0; i < addImage.length; i++) {
								formData.append('Images', addImage[i])
							}
							addCategory(formData)
							setAddName('')
							setAddDesc('')
							setAddImage('')
							handleAddClose()
						},
					},
				}}
			>
				<DialogTitle>Add User</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='name'
						label='Add Name'
						type='text'
						value={addName}
						onChange={e => setAddName(e.target.value)}
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						required
						margin='dense'
						id='name'
						name='name'
						label='Add Desc'
						type='text'
						value={addDesc}
						onChange={e => setAddDesc(e.target.value)}
						fullWidth
						variant='standard'
					/>
					<input type='file' onChange={handleImageAdd} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddClose}>Cancel</Button>
					<Button type='submit'>Subscribe</Button>
				</DialogActions>
			</Dialog>

			{/* addImageById */}
			<Dialog
				open={openAddImageById}
				onClose={handleAddImageByIdClose}
				slotProps={{
					paper: {
						component: 'form',
						onSubmit: event => {
							event.preventDefault()
							const formData = new FormData()
							for (let i = 0; i < addImageById.length; i++) {
								formData.append('Images', addImageById[i])
							}
							addImageByIdForUser({ formData, addIdById })

							handleAddImageByIdClose()
						},
					},
				}}
			>
				<DialogTitle>Add User</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<input type='file' multiple onChange={handleAddImageById} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddImageByIdClose}>Cancel</Button>
					<Button type='submit'>Subscribe</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
