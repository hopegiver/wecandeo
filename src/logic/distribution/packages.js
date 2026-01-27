// 배포 패키지 목록
export default {
    layout: 'default',

    data() {
        return {
            loading: false,
            packages: [],
            filteredPackages: [],
            selectedPackages: [],

            // 뷰 모드
            viewMode: 'grid', // 'grid' 또는 'list'

            // 필터
            searchQuery: '',
            filterStatus: '',
            filterVisibility: '',
            sortBy: 'updated',

            // 페이지네이션
            currentPage: 1,
            itemsPerPage: 12, // 그리드 뷰에서 12개씩

            // 통계
            stats: {
                total: 0,
                active: 0,
                totalVideos: 0,
                totalViews: 0
            }
        }
    },

    computed: {
        totalPages() {
            return Math.ceil(this.filteredPackages.length / this.itemsPerPage);
        },

        paginatedPackages() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredPackages.slice(start, end);
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

        allSelected() {
            return this.paginatedPackages.length > 0 &&
                   this.selectedPackages.length === this.paginatedPackages.length;
        }
    },

    filters: {
        number(value) {
            return new Intl.NumberFormat('ko-KR').format(value);
        },

        datetime(value) {
            const date = new Date(value);
            const now = new Date();
            const diff = now - date;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            if (days === 0) return '오늘';
            if (days === 1) return '어제';
            if (days < 7) return `${days}일 전`;
            if (days < 30) return `${Math.floor(days / 7)}주 전`;

            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    },

    async mounted() {
        await this.loadPackages();
    },

    methods: {
        async loadPackages() {
            this.loading = true;

            try {
                // 실제 구현 시 API 호출
                // const response = await this.$api.get('/api/distribution/packages');
                // this.packages = response.data;

                // 개발 모드: 목업 데이터
                await new Promise(resolve => setTimeout(resolve, 500));

                this.packages = [
                    {
                        id: 1,
                        name: '신제품 홍보 패키지',
                        description: '2024 신제품 라인업 소개',
                        videoCount: 5,
                        visibility: 'public',
                        status: 'active',
                        views: 12450,
                        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                        settings: {
                            player: 'public-v2',
                            domainRestriction: '',
                            youtubeSync: true
                        }
                    },
                    {
                        id: 2,
                        name: '내부 교육 자료',
                        description: '신입사원 온보딩 교육',
                        videoCount: 12,
                        visibility: 'private',
                        status: 'active',
                        views: 3240,
                        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                        settings: {
                            player: 'internal',
                            domainRestriction: 'company.com',
                            youtubeSync: false
                        }
                    },
                    {
                        id: 3,
                        name: '파트너 전용 콘텐츠',
                        description: '협력사 대상 제품 소개',
                        videoCount: 8,
                        visibility: 'unlisted',
                        status: 'active',
                        views: 5680,
                        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                        settings: {
                            player: 'partner',
                            domainRestriction: 'partner.com',
                            youtubeSync: false
                        }
                    },
                    {
                        id: 4,
                        name: '이벤트 라이브 스트리밍',
                        description: '연말 행사 생중계',
                        videoCount: 3,
                        visibility: 'public',
                        status: 'inactive',
                        views: 28900,
                        updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
                        settings: {
                            player: 'public-v2',
                            domainRestriction: '',
                            youtubeSync: true
                        }
                    },
                    {
                        id: 5,
                        name: '제품 데모 시리즈',
                        description: '제품 사용법 안내',
                        videoCount: 15,
                        visibility: 'public',
                        status: 'draft',
                        views: 0,
                        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                        settings: {
                            player: 'public-v2',
                            domainRestriction: '',
                            youtubeSync: false
                        }
                    },
                    {
                        id: 6,
                        name: '고객 사례 연구',
                        description: '성공적인 고객 활용 사례',
                        videoCount: 7,
                        visibility: 'public',
                        status: 'active',
                        views: 18760,
                        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                        settings: {
                            player: 'public-v2',
                            domainRestriction: '',
                            youtubeSync: true
                        }
                    },
                    {
                        id: 7,
                        name: '웨비나 시리즈',
                        description: '월간 웨비나 녹화본',
                        videoCount: 24,
                        visibility: 'unlisted',
                        status: 'active',
                        views: 9430,
                        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                        settings: {
                            player: 'public-v2',
                            domainRestriction: '',
                            youtubeSync: false
                        }
                    },
                    {
                        id: 8,
                        name: '브랜드 광고 캠페인',
                        description: 'Q1 광고 소재',
                        videoCount: 6,
                        visibility: 'public',
                        status: 'inactive',
                        views: 45200,
                        updatedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                        settings: {
                            player: 'public-v2',
                            domainRestriction: '',
                            youtubeSync: true
                        }
                    },
                    {
                        id: 9,
                        name: '기술 지원 가이드',
                        description: '기술팀 내부 참고자료',
                        videoCount: 18,
                        visibility: 'private',
                        status: 'active',
                        views: 2140,
                        updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                        settings: {
                            player: 'internal',
                            domainRestriction: 'company.com',
                            youtubeSync: false
                        }
                    },
                    {
                        id: 10,
                        name: '투자자 설명회',
                        description: '주주총회 및 IR 자료',
                        videoCount: 4,
                        visibility: 'private',
                        status: 'active',
                        views: 856,
                        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                        settings: {
                            player: 'premium',
                            domainRestriction: 'investor.company.com',
                            youtubeSync: false
                        }
                    }
                ];

                this.calculateStats();
                this.applyFilters();

            } catch (error) {
                console.error('패키지 로드 실패:', error);
                alert('패키지를 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },

        calculateStats() {
            this.stats.total = this.packages.length;
            this.stats.active = this.packages.filter(p => p.status === 'active').length;
            this.stats.totalVideos = this.packages.reduce((sum, p) => sum + p.videoCount, 0);
            this.stats.totalViews = this.packages.reduce((sum, p) => sum + p.views, 0);
        },

        applyFilters() {
            let filtered = [...this.packages];

            // 검색어 필터
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(pkg =>
                    pkg.name.toLowerCase().includes(query) ||
                    pkg.description.toLowerCase().includes(query)
                );
            }

            // 상태 필터
            if (this.filterStatus) {
                filtered = filtered.filter(pkg => pkg.status === this.filterStatus);
            }

            // 공개범위 필터
            if (this.filterVisibility) {
                filtered = filtered.filter(pkg => pkg.visibility === this.filterVisibility);
            }

            // 정렬
            filtered.sort((a, b) => {
                switch (this.sortBy) {
                    case 'updated':
                        return b.updatedAt - a.updatedAt;
                    case 'created':
                        return b.id - a.id;
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'videos':
                        return b.videoCount - a.videoCount;
                    default:
                        return 0;
                }
            });

            this.filteredPackages = filtered;
            this.currentPage = 1;
        },

        resetFilters() {
            this.searchQuery = '';
            this.filterStatus = '';
            this.filterVisibility = '';
            this.sortBy = 'updated';
            this.applyFilters();
        },

        getVisibilityClass(visibility) {
            const classes = {
                public: 'bg-success',
                unlisted: 'bg-warning',
                private: 'bg-secondary'
            };
            return classes[visibility] || 'bg-secondary';
        },

        getVisibilityIcon(visibility) {
            const icons = {
                public: 'bi bi-globe',
                unlisted: 'bi bi-link-45deg',
                private: 'bi bi-lock'
            };
            return icons[visibility] || 'bi bi-question';
        },

        getVisibilityLabel(visibility) {
            const labels = {
                public: '공개',
                unlisted: '링크만',
                private: '비공개'
            };
            return labels[visibility] || visibility;
        },

        getStatusClass(status) {
            const classes = {
                active: 'bg-success',
                inactive: 'bg-secondary',
                draft: 'bg-warning text-dark'
            };
            return classes[status] || 'bg-secondary';
        },

        getStatusLabel(status) {
            const labels = {
                active: '활성',
                inactive: '비활성',
                draft: '임시저장'
            };
            return labels[status] || status;
        },

        toggleSelectAll(event) {
            if (event.target.checked) {
                this.selectedPackages = this.paginatedPackages.map(p => p.id);
            } else {
                this.selectedPackages = [];
            }
        },

        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },

        goToCreate() {
            this.navigateTo('/distribution/package-create');
        },

        viewPackage(id) {
            this.navigateTo('/distribution/package-detail', { id });
        },

        editPackage(id) {
            this.navigateTo('/distribution/package-create', { id });
        },

        async deletePackage(id) {
            if (!confirm('이 패키지를 삭제하시겠습니까?')) return;

            try {
                // 실제 구현 시 API 호출
                // await this.$api.delete(`/api/distribution/packages/${id}`);

                this.packages = this.packages.filter(p => p.id !== id);
                this.calculateStats();
                this.applyFilters();

                alert('패키지가 삭제되었습니다.');
            } catch (error) {
                console.error('패키지 삭제 실패:', error);
                alert('패키지 삭제에 실패했습니다.');
            }
        },

        async bulkActivate() {
            if (!confirm(`선택한 ${this.selectedPackages.length}개 패키지를 활성화하시겠습니까?`)) return;

            try {
                this.packages.forEach(pkg => {
                    if (this.selectedPackages.includes(pkg.id)) {
                        pkg.status = 'active';
                    }
                });

                this.calculateStats();
                this.applyFilters();
                this.selectedPackages = [];

                alert('패키지가 활성화되었습니다.');
            } catch (error) {
                console.error('일괄 활성화 실패:', error);
                alert('일괄 활성화에 실패했습니다.');
            }
        },

        async bulkDeactivate() {
            if (!confirm(`선택한 ${this.selectedPackages.length}개 패키지를 비활성화하시겠습니까?`)) return;

            try {
                this.packages.forEach(pkg => {
                    if (this.selectedPackages.includes(pkg.id)) {
                        pkg.status = 'inactive';
                    }
                });

                this.calculateStats();
                this.applyFilters();
                this.selectedPackages = [];

                alert('패키지가 비활성화되었습니다.');
            } catch (error) {
                console.error('일괄 비활성화 실패:', error);
                alert('일괄 비활성화에 실패했습니다.');
            }
        },

        async bulkDelete() {
            if (!confirm(`선택한 ${this.selectedPackages.length}개 패키지를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) return;

            try {
                this.packages = this.packages.filter(p => !this.selectedPackages.includes(p.id));

                this.calculateStats();
                this.applyFilters();
                this.selectedPackages = [];

                alert('패키지가 삭제되었습니다.');
            } catch (error) {
                console.error('일괄 삭제 실패:', error);
                alert('일괄 삭제에 실패했습니다.');
            }
        }
    }
}
