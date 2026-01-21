// 배포 패키지 생성/편집
export default {
    layout: 'default',

    data() {
        return {
            isEditMode: false,
            packageId: null,
            saving: false,
            saveAsTemplate: false,
            templateName: '',
            videoSearchQuery: '',

            form: {
                name: '',
                description: '',
                category: '',
                status: 'draft',
                videos: [],
                settings: {
                    visibility: 'public',
                    domainRestriction: '',
                    player: 'public-v2',
                    playerOptions: {
                        autoplay: false,
                        controls: true,
                        qualitySelector: true,
                        downloadButton: false
                    },
                    external: {
                        youtubeSync: false,
                        facebookSync: false
                    },
                    advanced: {
                        ipWhitelist: '',
                        allowedCountries: '',
                        blockedCountries: '',
                        drmEnabled: false
                    }
                }
            },

            availableVideos: []
        }
    },

    filters: {
        number(value) {
            return new Intl.NumberFormat('ko-KR').format(value);
        }
    },

    async mounted() {
        // 편집 모드인지 확인
        this.packageId = this.getParam('id');
        this.isEditMode = !!this.packageId;

        if (this.isEditMode) {
            await this.loadPackage();
        }

        await this.loadAvailableVideos();
    },

    methods: {
        async loadPackage() {
            try {
                // 실제 구현 시 API 호출
                // const response = await this.$api.get(`/api/distribution/packages/${this.packageId}`);
                // this.form = response.data;

                // 개발 모드: 목업 데이터
                await new Promise(resolve => setTimeout(resolve, 300));

                this.form = {
                    name: '신제품 홍보 패키지',
                    description: '2024 신제품 라인업 소개',
                    category: 'marketing',
                    status: 'active',
                    videos: [
                        {
                            id: 1,
                            title: '신제품 티저 영상',
                            thumbnail: 'https://picsum.photos/seed/v1/300/200',
                            duration: '2:34',
                            views: 12450
                        },
                        {
                            id: 2,
                            title: '제품 상세 설명',
                            thumbnail: 'https://picsum.photos/seed/v2/300/200',
                            duration: '5:21',
                            views: 8920
                        }
                    ],
                    settings: {
                        visibility: 'public',
                        domainRestriction: '',
                        player: 'public-v2',
                        playerOptions: {
                            autoplay: false,
                            controls: true,
                            qualitySelector: true,
                            downloadButton: false
                        },
                        external: {
                            youtubeSync: true,
                            facebookSync: false
                        },
                        advanced: {
                            ipWhitelist: '',
                            allowedCountries: '',
                            blockedCountries: '',
                            drmEnabled: false
                        }
                    }
                };

            } catch (error) {
                console.error('패키지 로드 실패:', error);
                alert('패키지를 불러오는데 실패했습니다.');
                this.goBack();
            }
        },

        async loadAvailableVideos() {
            try {
                // 실제 구현 시 API 호출
                // const response = await this.$api.get('/api/media/videos');
                // this.availableVideos = response.data;

                // 개발 모드: 목업 데이터
                this.availableVideos = [
                    {
                        id: 1,
                        title: '신제품 티저 영상',
                        thumbnail: 'https://picsum.photos/seed/v1/300/200',
                        duration: '2:34',
                        views: 12450
                    },
                    {
                        id: 2,
                        title: '제품 상세 설명',
                        thumbnail: 'https://picsum.photos/seed/v2/300/200',
                        duration: '5:21',
                        views: 8920
                    },
                    {
                        id: 3,
                        title: '고객 후기 모음',
                        thumbnail: 'https://picsum.photos/seed/v3/300/200',
                        duration: '3:45',
                        views: 15320
                    },
                    {
                        id: 4,
                        title: '사용 가이드',
                        thumbnail: 'https://picsum.photos/seed/v4/300/200',
                        duration: '7:12',
                        views: 6780
                    },
                    {
                        id: 5,
                        title: '비교 분석',
                        thumbnail: 'https://picsum.photos/seed/v5/300/200',
                        duration: '4:56',
                        views: 9450
                    }
                ];

            } catch (error) {
                console.error('동영상 목록 로드 실패:', error);
            }
        },

        applyTemplate(type) {
            const templates = {
                public: {
                    visibility: 'public',
                    domainRestriction: '',
                    player: 'public-v2',
                    playerOptions: {
                        autoplay: false,
                        controls: true,
                        qualitySelector: true,
                        downloadButton: false
                    },
                    external: {
                        youtubeSync: true,
                        facebookSync: false
                    },
                    advanced: {
                        ipWhitelist: '',
                        allowedCountries: '',
                        blockedCountries: '',
                        drmEnabled: false
                    }
                },
                internal: {
                    visibility: 'private',
                    domainRestriction: 'company.com',
                    player: 'internal',
                    playerOptions: {
                        autoplay: false,
                        controls: true,
                        qualitySelector: true,
                        downloadButton: false
                    },
                    external: {
                        youtubeSync: false,
                        facebookSync: false
                    },
                    advanced: {
                        ipWhitelist: '192.168.1.0/24',
                        allowedCountries: '',
                        blockedCountries: '',
                        drmEnabled: false
                    }
                },
                partner: {
                    visibility: 'unlisted',
                    domainRestriction: 'partner.com',
                    player: 'partner',
                    playerOptions: {
                        autoplay: false,
                        controls: true,
                        qualitySelector: true,
                        downloadButton: true
                    },
                    external: {
                        youtubeSync: false,
                        facebookSync: false
                    },
                    advanced: {
                        ipWhitelist: '',
                        allowedCountries: '',
                        blockedCountries: '',
                        drmEnabled: false
                    }
                }
            };

            if (templates[type]) {
                this.form.settings = JSON.parse(JSON.stringify(templates[type]));

                const labels = {
                    public: '공개용',
                    internal: '내부용',
                    partner: '파트너용'
                };

                alert(`${labels[type]} 템플릿이 적용되었습니다.`);
            }
        },

        showVideoSelector() {
            const modal = new bootstrap.Modal(document.getElementById('videoSelectorModal'));
            modal.show();
        },

        addVideo(video) {
            // 이미 추가된 동영상인지 확인
            const exists = this.form.videos.find(v => v.id === video.id);
            if (exists) {
                alert('이미 추가된 동영상입니다.');
                return;
            }

            this.form.videos.push(video);

            // 모달 닫기
            const modal = bootstrap.Modal.getInstance(document.getElementById('videoSelectorModal'));
            if (modal) {
                modal.hide();
            }
        },

        removeVideo(index) {
            if (confirm('이 동영상을 패키지에서 제거하시겠습니까?')) {
                this.form.videos.splice(index, 1);
            }
        },

        getVisibilityLabel(visibility) {
            const labels = {
                public: '완전 공개',
                unlisted: '링크만 공유',
                private: '비공개'
            };
            return labels[visibility] || visibility;
        },

        getPlayerLabel(player) {
            const labels = {
                'public-v2': '공개용 플레이어 v2',
                'internal': '내부용 플레이어',
                'partner': '파트너용 플레이어',
                'premium': '프리미엄 플레이어'
            };
            return labels[player] || player;
        },

        async savePackage() {
            // 유효성 검사
            if (!this.form.name) {
                alert('패키지 이름을 입력해주세요.');
                return;
            }

            if (this.form.videos.length === 0) {
                alert('최소 1개 이상의 동영상을 추가해주세요.');
                return;
            }

            this.saving = true;

            try {
                // 실제 구현 시 API 호출
                if (this.isEditMode) {
                    // await this.$api.put(`/api/distribution/packages/${this.packageId}`, this.form);
                } else {
                    // await this.$api.post('/api/distribution/packages', this.form);
                }

                // 템플릿 저장
                if (this.saveAsTemplate && this.templateName) {
                    // await this.$api.post('/api/distribution/templates', {
                    //     name: this.templateName,
                    //     settings: this.form.settings
                    // });
                }

                await new Promise(resolve => setTimeout(resolve, 1000));

                alert(this.isEditMode ? '패키지가 수정되었습니다.' : '패키지가 생성되었습니다.');
                this.navigateTo('/distribution/packages');

            } catch (error) {
                console.error('패키지 저장 실패:', error);
                alert('패키지 저장에 실패했습니다.');
            } finally {
                this.saving = false;
            }
        },

        goBack() {
            this.navigateTo('/distribution/packages');
        }
    }
}
