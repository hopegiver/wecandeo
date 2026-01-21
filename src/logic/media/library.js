export default {
    layout: 'default',

    data() {
        return {
            viewMode: 'grid', // 'grid' or 'list'
            filters: {
                search: '',
                status: '',
                sort: 'date_desc'
            },
            selectedVideos: [],
            selectedFolder: 'all',
            selectedCategory: null,
            videos: [],
            folders: [],
            categories: [],
            totalVideos: 0,
            currentPage: 1,
            perPage: 12,
            totalPages: 1
        };
    },

    computed: {
        currentFolderName() {
            if (this.selectedCategory) {
                const cat = this.categories.find(c => c.id === this.selectedCategory);
                return cat ? cat.name : '미디어 보관함';
            }
            const folder = this.folders.find(f => f.id === this.selectedFolder);
            return folder ? folder.name : '미디어 보관함';
        },

        filteredCount() {
            // TODO: 실제 필터링된 개수 계산
            return this.totalVideos;
        },

        displayPages() {
            const pages = [];
            const maxPages = 5;
            let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
            let endPage = Math.min(this.totalPages, startPage + maxPages - 1);

            if (endPage - startPage < maxPages - 1) {
                startPage = Math.max(1, endPage - maxPages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            return pages;
        },

        isAllSelected() {
            return this.videos.length > 0 && this.selectedVideos.length === this.videos.length;
        }
    },

    async mounted() {
        await this.loadFolders();
        await this.loadCategories();
        await this.loadVideos();
    },

    methods: {
        async loadFolders() {
            // TODO: API 호출로 실제 데이터 로드
            // const response = await this.$api.get('/api/media/folders');

            // 임시 데이터
            this.folders = [
                { id: 'all', name: '전체 동영상', count: 1247 },
                { id: 'marketing', name: '마케팅', count: 324 },
                { id: 'tutorial', name: '튜토리얼', count: 156 },
                { id: 'product', name: '제품 소개', count: 89 },
                { id: 'internal', name: '내부용', count: 45 },
                { id: 'events', name: '이벤트', count: 67 }
            ];
        },

        async loadCategories() {
            // TODO: API 호출로 실제 데이터 로드
            // const response = await this.$api.get('/api/media/categories');

            // 임시 데이터
            this.categories = [
                { id: 'promo', name: '프로모션', color: '#6366f1', count: 234 },
                { id: 'guide', name: '가이드', color: '#10b981', count: 189 },
                { id: 'demo', name: '데모', color: '#f59e0b', count: 145 },
                { id: 'case', name: '사례', color: '#ec4899', count: 98 },
                { id: 'news', name: '뉴스', color: '#8b5cf6', count: 76 }
            ];
        },

        async loadVideos() {
            // TODO: API 호출로 실제 데이터 로드
            // const response = await this.$api.get('/api/media/videos', { params: this.getFilterParams() });

            // 임시 데이터
            this.videos = [
                {
                    id: 1,
                    title: '신제품 소개 영상 2024',
                    thumbnail: 'https://via.placeholder.com/320x180/6366f1/ffffff?text=Video+1',
                    duration: '05:24',
                    uploadDate: '2024-01-15',
                    views: 125430,
                    size: '245 MB',
                    encodingStatus: 'completed',
                    encodedVersions: ['1080p', '720p', '480p'],
                    tags: ['마케팅', '제품소개', '2024']
                },
                {
                    id: 2,
                    title: '사용자 가이드 - 시작하기',
                    thumbnail: 'https://via.placeholder.com/320x180/10b981/ffffff?text=Video+2',
                    duration: '08:15',
                    uploadDate: '2024-01-14',
                    views: 98234,
                    size: '350 MB',
                    encodingStatus: 'encoding',
                    encodedVersions: ['720p', '480p'],
                    tags: ['튜토리얼', '가이드']
                },
                {
                    id: 3,
                    title: '회사 소개 영상',
                    thumbnail: 'https://via.placeholder.com/320x180/f59e0b/ffffff?text=Video+3',
                    duration: '03:42',
                    uploadDate: '2024-01-13',
                    views: 87651,
                    size: '180 MB',
                    encodingStatus: 'completed',
                    encodedVersions: ['1080p', '720p', '480p', '360p'],
                    tags: ['회사소개', '마케팅']
                },
                {
                    id: 4,
                    title: '고급 기능 활용법',
                    thumbnail: 'https://via.placeholder.com/320x180/ef4444/ffffff?text=Video+4',
                    duration: '12:30',
                    uploadDate: '2024-01-12',
                    views: 76543,
                    size: '520 MB',
                    encodingStatus: 'completed',
                    encodedVersions: ['1080p', '720p'],
                    tags: ['튜토리얼', '고급']
                },
                {
                    id: 5,
                    title: '월간 뉴스레터 1월',
                    thumbnail: 'https://via.placeholder.com/320x180/8b5cf6/ffffff?text=Video+5',
                    duration: '06:18',
                    uploadDate: '2024-01-11',
                    views: 65432,
                    size: '280 MB',
                    encodingStatus: 'queued',
                    encodedVersions: [],
                    tags: ['뉴스레터', '내부용']
                },
                {
                    id: 6,
                    title: '제품 데모 영상',
                    thumbnail: 'https://via.placeholder.com/320x180/ec4899/ffffff?text=Video+6',
                    duration: '04:50',
                    uploadDate: '2024-01-10',
                    views: 54321,
                    size: '210 MB',
                    encodingStatus: 'completed',
                    encodedVersions: ['1080p', '720p', '480p'],
                    tags: ['제품소개', '데모']
                },
                {
                    id: 7,
                    title: '고객 성공 사례',
                    thumbnail: 'https://via.placeholder.com/320x180/14b8a6/ffffff?text=Video+7',
                    duration: '07:25',
                    uploadDate: '2024-01-09',
                    views: 43210,
                    size: '320 MB',
                    encodingStatus: 'completed',
                    encodedVersions: ['1080p', '720p'],
                    tags: ['마케팅', '사례']
                },
                {
                    id: 8,
                    title: '온보딩 가이드',
                    thumbnail: 'https://via.placeholder.com/320x180/f97316/ffffff?text=Video+8',
                    duration: '09:15',
                    uploadDate: '2024-01-08',
                    views: 38765,
                    size: '380 MB',
                    encodingStatus: 'completed',
                    encodedVersions: ['1080p', '720p', '480p'],
                    tags: ['튜토리얼', '온보딩']
                },
                {
                    id: 9,
                    title: '웨비나 녹화본',
                    thumbnail: 'https://via.placeholder.com/320x180/06b6d4/ffffff?text=Video+9',
                    duration: '45:20',
                    uploadDate: '2024-01-07',
                    views: 32145,
                    size: '1.2 GB',
                    encodingStatus: 'completed',
                    encodedVersions: ['1080p', '720p'],
                    tags: ['이벤트', '웨비나']
                },
                {
                    id: 10,
                    title: 'Q&A 세션',
                    thumbnail: 'https://via.placeholder.com/320x180/84cc16/ffffff?text=Video+10',
                    duration: '25:15',
                    uploadDate: '2024-01-06',
                    views: 28456,
                    size: '850 MB',
                    encodingStatus: 'completed',
                    encodedVersions: ['1080p', '720p', '480p'],
                    tags: ['이벤트', 'Q&A']
                },
                {
                    id: 11,
                    title: '분기 실적 발표',
                    thumbnail: 'https://via.placeholder.com/320x180/a855f7/ffffff?text=Video+11',
                    duration: '18:40',
                    uploadDate: '2024-01-05',
                    views: 15234,
                    size: '620 MB',
                    encodingStatus: 'completed',
                    encodedVersions: ['1080p', '720p'],
                    tags: ['내부용', '발표']
                },
                {
                    id: 12,
                    title: '고객 인터뷰',
                    thumbnail: 'https://via.placeholder.com/320x180/f43f5e/ffffff?text=Video+12',
                    duration: '12:05',
                    uploadDate: '2024-01-04',
                    views: 42678,
                    size: '480 MB',
                    encodingStatus: 'completed',
                    encodedVersions: ['1080p', '720p', '480p'],
                    tags: ['마케팅', '인터뷰']
                }
            ];

            this.totalVideos = 1247;
            this.totalPages = Math.ceil(this.totalVideos / this.perPage);
        },

        selectFolder(folderId) {
            this.selectedFolder = folderId;
            this.selectedCategory = null; // 카테고리 선택 해제
            this.currentPage = 1;
            this.loadVideos();
        },

        selectCategory(categoryId) {
            this.selectedCategory = categoryId;
            this.selectedFolder = null; // 폴더 선택 해제
            this.currentPage = 1;
            this.loadVideos();
        },

        createFolder() {
            // TODO: 폴더 생성 모달 표시
            const folderName = prompt('새 폴더 이름을 입력하세요:');
            if (folderName) {
                console.log('새 폴더 생성:', folderName);
                // TODO: API 호출
                // await this.$api.post('/api/media/folders', { name: folderName });
                this.loadFolders();
            }
        },

        openCategoryManager() {
            // TODO: 카테고리 관리 모달 표시
            console.log('카테고리 관리 모달 열기');
            this.navigateTo('/settings/categories');
        },

        getFilterParams() {
            return {
                search: this.filters.search,
                status: this.filters.status,
                folder: this.selectedFolder !== 'all' ? this.selectedFolder : null,
                category: this.selectedCategory,
                sort: this.filters.sort,
                page: this.currentPage,
                perPage: this.perPage
            };
        },

        handleSearch() {
            this.currentPage = 1;
            this.loadVideos();
        },

        getStatusBadgeClass(status) {
            const statusMap = {
                'completed': 'bg-success-subtle text-success',
                'encoding': 'bg-warning-subtle text-warning',
                'queued': 'bg-secondary-subtle text-secondary',
                'failed': 'bg-danger-subtle text-danger'
            };
            return statusMap[status] || 'bg-secondary-subtle text-secondary';
        },

        getStatusText(status) {
            const statusMap = {
                'completed': '완료',
                'encoding': '인코딩 중',
                'queued': '대기 중',
                'failed': '실패'
            };
            return statusMap[status] || status;
        },

        toggleSelection(id) {
            const index = this.selectedVideos.indexOf(id);
            if (index > -1) {
                this.selectedVideos.splice(index, 1);
            } else {
                this.selectedVideos.push(id);
            }
        },

        toggleSelectAll(event) {
            if (event.target.checked) {
                this.selectedVideos = this.videos.map(v => v.id);
            } else {
                this.selectedVideos = [];
            }
        },

        clearSelection() {
            this.selectedVideos = [];
        },

        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            this.loadVideos();
        },

        goToUpload() {
            this.navigateTo('/media/upload');
        },

        viewDetail(id) {
            this.navigateTo('/media/detail', { id });
        },

        editVideo(id) {
            this.navigateTo('/media/edit', { id });
        },

        downloadVideo(id) {
            console.log('다운로드:', id);
            // TODO: 다운로드 로직 구현
        },

        async deleteVideo(id) {
            if (confirm('이 동영상을 삭제하시겠습니까?')) {
                // TODO: API 호출
                // await this.$api.delete(`/api/media/videos/${id}`);
                await this.loadVideos();
            }
        },

        addToPackage(ids = null) {
            const videoIds = ids || this.selectedVideos;
            if (videoIds.length === 0) {
                alert('동영상을 선택해주세요.');
                return;
            }
            this.navigateTo('/distribution/packages', { action: 'add', videos: videoIds.join(',') });
        },

        bulkAddTags() {
            if (this.selectedVideos.length === 0) return;
            // TODO: 태그 추가 모달 표시
            const tags = prompt('추가할 태그를 입력하세요 (쉼표로 구분):');
            if (tags) {
                console.log('태그 추가:', this.selectedVideos, tags);
                // TODO: API 호출
            }
        },

        bulkMove() {
            if (this.selectedVideos.length === 0) return;
            // TODO: 폴더 이동 모달 표시
            console.log('폴더 이동:', this.selectedVideos);
            // 임시 구현
            const folderNames = this.folders.map(f => f.name).join(', ');
            const targetFolder = prompt(`이동할 폴더를 선택하세요:\n${folderNames}`);
            if (targetFolder) {
                console.log('선택한 폴더:', targetFolder);
                // TODO: API 호출
            }
        },

        async bulkDelete() {
            if (this.selectedVideos.length === 0) return;
            if (confirm(`선택한 ${this.selectedVideos.length}개의 동영상을 삭제하시겠습니까?`)) {
                // TODO: API 호출
                // await this.$api.post('/api/media/videos/bulk-delete', { ids: this.selectedVideos });
                this.selectedVideos = [];
                await this.loadVideos();
            }
        }
    },

    watch: {
        'filters.status'() {
            this.currentPage = 1;
            this.loadVideos();
        },
        'filters.sort'() {
            this.loadVideos();
        }
    }
};
