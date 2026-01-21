export default {
    layout: 'default',

    data() {
        return {
            files: [],
            isDragging: false,
            uploading: false,
            uploadedCount: 0,
            metadata: {
                folder: '',
                tags: '',
                description: ''
            },
            encodingOption: 'auto', // 'auto', 'custom', 'later'
            customQualities: ['1080p', '720p', '480p']
        };
    },

    methods: {
        handleDrop(e) {
            this.isDragging = false;
            const droppedFiles = Array.from(e.dataTransfer.files);
            this.addFiles(droppedFiles);
        },

        handleFileSelect(e) {
            const selectedFiles = Array.from(e.target.files);
            this.addFiles(selectedFiles);
            // Reset input
            e.target.value = '';
        },

        addFiles(newFiles) {
            // 비디오 파일만 필터링
            const videoFiles = newFiles.filter(file => file.type.startsWith('video/'));

            if (videoFiles.length !== newFiles.length) {
                alert('비디오 파일만 업로드할 수 있습니다.');
            }

            // 파일 크기 체크 (5GB)
            const maxSize = 5 * 1024 * 1024 * 1024; // 5GB in bytes
            const oversizedFiles = videoFiles.filter(file => file.size > maxSize);

            if (oversizedFiles.length > 0) {
                alert(`파일 크기가 5GB를 초과합니다: ${oversizedFiles.map(f => f.name).join(', ')}`);
                return;
            }

            // 파일 객체 생성
            const fileObjects = videoFiles.map(file => ({
                name: file.name,
                size: file.size,
                file: file,
                uploading: false,
                uploaded: false,
                progress: 0,
                error: null
            }));

            this.files.push(...fileObjects);
        },

        removeFile(index) {
            this.files.splice(index, 1);
        },

        clearAll() {
            if (this.uploading) {
                if (!confirm('업로드가 진행 중입니다. 정말 취소하시겠습니까?')) {
                    return;
                }
            }
            this.files = [];
            this.uploading = false;
            this.uploadedCount = 0;
        },

        async startUpload() {
            if (!this.files.length) {
                alert('업로드할 파일을 선택해주세요.');
                return;
            }

            // 선택 인코딩이지만 화질이 선택되지 않은 경우
            if (this.encodingOption === 'custom' && this.customQualities.length === 0) {
                alert('인코딩 화질을 하나 이상 선택해주세요.');
                return;
            }

            this.uploading = true;
            this.uploadedCount = 0;

            // 파일들을 순차적으로 업로드
            for (let i = 0; i < this.files.length; i++) {
                await this.uploadFile(this.files[i]);
            }

            this.uploading = false;

            // 모두 성공적으로 업로드된 경우
            if (this.uploadedCount === this.files.length) {
                alert('모든 파일이 성공적으로 업로드되었습니다.');

                // 미디어 보관함으로 이동할지 물어보기
                if (confirm('미디어 보관함으로 이동하시겠습니까?')) {
                    this.goToLibrary();
                } else {
                    // 파일 목록 초기화
                    this.files = [];
                    this.uploadedCount = 0;
                }
            }
        },

        async uploadFile(fileObj) {
            fileObj.uploading = true;
            fileObj.progress = 0;

            // TODO: 실제 API 호출
            // const formData = new FormData();
            // formData.append('file', fileObj.file);
            // formData.append('folder', this.metadata.folder);
            // formData.append('tags', this.metadata.tags);
            // formData.append('description', this.metadata.description);
            // formData.append('encodingOption', this.encodingOption);
            // if (this.encodingOption === 'custom') {
            //     formData.append('customQualities', JSON.stringify(this.customQualities));
            // }

            // const response = await this.$api.post('/api/media/upload', formData, {
            //     onUploadProgress: (progressEvent) => {
            //         fileObj.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            //     }
            // });

            // 임시: 업로드 시뮬레이션
            await this.simulateUpload(fileObj);

            fileObj.uploading = false;
            fileObj.uploaded = true;
            this.uploadedCount++;
        },

        // 업로드 시뮬레이션 (개발용)
        simulateUpload(fileObj) {
            return new Promise((resolve) => {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 15;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                        fileObj.progress = 100;
                        setTimeout(resolve, 200);
                    } else {
                        fileObj.progress = Math.round(progress);
                    }
                }, 200);
            });
        },

        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
        },

        goToLibrary() {
            this.navigateTo('/media/library');
        }
    }
};
