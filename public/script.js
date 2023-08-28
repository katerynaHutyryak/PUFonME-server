document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('image')
    const filterButtons = document.querySelectorAll('#filter-buttons button')
    const cameraIcon = document.getElementById('camera-icon')
    const fileInput = document.getElementById('file-input')

    fileInput.onchange = async () => {
        const formData = new FormData()
        formData.append('image', fileInput.files[0])

        try {
            const response = await fetch(
                'http://127.0.0.1:8080/api/v1/images/upload',
                {
                    method: 'POST',
                    body: formData,
                }
            )

            if (response.ok) {
                const res = await response.json()
                image.src = res.imageUrl
                cameraIcon.style.display = 'none'
            }
        } catch (error) {
            console.error('Error uploading image:', error)
        }
    }

    filterButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const filterName = button.textContent.toLowerCase()

            const imageName = new URL(image.src).pathname.split('/').pop()

            try {
                const response = await fetch(
                    `/api/v1/images/filter/?imageName=${imageName}&filterName=${filterName}`
                )
                if (response.ok) {
                    const res = await response.json()
                    image.src = `${res.editedImageUrl}?${new Date().getTime()}` // date is for img refresh
                }
            } catch (error) {
                console.error(`Error applying ${filterName} filter:`, error)
            }
        })
    })
})
