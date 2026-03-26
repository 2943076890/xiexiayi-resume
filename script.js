/**
 * 谢夏伊个人简历网站交互功能
 * 功能包括：返回顶部按钮、项目卡片交互、平滑滚动
 */

document.addEventListener('DOMContentLoaded', function() {
    // 返回顶部按钮
    const backToTopButton = document.getElementById('backToTop');

    // 显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // 返回顶部功能
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 项目悬停效果增强
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach(item => {
        const title = item.querySelector('.project-title');
        const hoverContent = item.querySelector('.project-hover-content');
        const visibleContent = item.querySelector('.project-visible-content');

        // 添加点击切换功能（移动端友好）
        title.addEventListener('click', function(e) {
            // 只在移动设备或小屏幕上启用点击切换
            if (window.innerWidth <= 768) {
                e.stopPropagation();

                // 如果当前正在显示悬停内容，则隐藏它
                if (hoverContent.style.display === 'block') {
                    hoverContent.style.display = 'none';
                    if (visibleContent) visibleContent.style.display = 'block';
                    title.classList.remove('active');
                } else {
                    // 否则显示悬停内容
                    hoverContent.style.display = 'block';
                    if (visibleContent) visibleContent.style.display = 'none';
                    title.classList.add('active');
                }
            }
        });

        // 为项目项添加更平滑的悬停过渡
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateX(8px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // 技能标签点击效果
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            // 创建涟漪效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            // 移除涟漪元素
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 卡片悬停效果增强
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const cardTitle = this.querySelector('.card-title');
            if (cardTitle) {
                cardTitle.style.transition = 'color 0.3s ease';
                cardTitle.style.color = 'var(--text-accent)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const cardTitle = this.querySelector('.card-title');
            if (cardTitle) {
                cardTitle.style.color = '';
            }
        });
    });

    // 当前年份自动更新
    const yearElement = document.querySelector('footer p');
    if (yearElement && yearElement.textContent.includes('2024')) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
    }

    // 控制台欢迎信息
    console.log('%c👩‍💻 谢夏伊的个人简历网站', 'color: #1677ff; font-size: 16px; font-weight: bold;');
    console.log('%c欢迎访问我的个人主页！', 'color: #5a6a7a; font-size: 14px;');
    console.log('%c慢慢又漫漫，漫漫亦灿灿', 'color: #2c3e50; font-style: italic;');

    // 添加打印友好功能
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> 打印简历';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 32px;
        background-color: var(--text-accent);
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-family: inherit;
        font-size: 14px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 99;
        transition: all 0.3s ease;
    `;

    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    });

    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    });

    printButton.addEventListener('click', function() {
        window.print();
    });

    document.body.appendChild(printButton);

    // ==================== 项目图片集功能 ====================
    const projectGalleryModal = document.getElementById('projectGalleryModal');
    const galleryCloseBtn = projectGalleryModal.querySelector('.gallery-close');
    const galleryOverlay = projectGalleryModal.querySelector('.gallery-modal-overlay');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryProjectTitle = document.getElementById('galleryProjectTitle');
    const galleryImageCount = document.getElementById('galleryImageCount');

    // 示例图片数据（用户可替换为自己的图片）
    // 格式：每个项目ID对应一个图片URL数组
    const exampleImages = {
        'project-1': [
            'https://user4146.cn.imgto.link/public/20260326/20260326105017-843-12.avif',
            'https://user4146.cn.imgto.link/public/20260326/20260326105033-844-12.avif',
            'https://user4146.cn.imgto.link/public/20260326/20260326105253-846-12.avif'
        ],
        'project-2': [
            'https://user4146.cn.imgto.link/public/20260326/wps-1.avif',
            'https://user4146.cn.imgto.link/public/20260326/wps-2.avif',
            'https://user4146.cn.imgto.link/public/20260326/wps-3.avif'
        ],
        'project-3': [
            'https://user4146.cn.imgto.link/public/20260326/wps-1-1.avif',
            'https://user4146.cn.imgto.link/public/20260326/20260307195401-702-12.avif',
            'https://user4146.cn.imgto.link/public/20260326/20260312123853-759-12.avif'
        ],
        'project-4': [
            'https://user4146.cn.imgto.link/public/20260326/20260307202312-711-12.avif',
            'https://user4146.cn.imgto.link/public/20260326/20260307201735-710-12.avif',
            'https://user4146.cn.imgto.link/public/20260326/20260307201530-707-12.avif'
        ],
        'project-5': [
            'https://user4146.cn.imgto.link/public/20260326/wps-1-2.avif',
            'https://user4146.cn.imgto.link/public/20260326/20260314212851-770-12.avif',
            'https://user4146.cn.imgto.link/public/20260326/20260314212853-771-12.avif'
            
        ],
        'project-6': [
            'https://user4146.cn.imgto.link/public/20260326/2026-03-26-110948.avif',
            'https://user4146.cn.imgto.link/public/20260326/2026-03-26-111226.avif',
            'https://user4146.cn.imgto.link/public/20260326/2026-03-26-112348.avif'
        ]
    };

    // ==================== 图片放大功能变量 ====================
    const imageZoomModal = document.getElementById('imageZoomModal');
    const zoomOverlay = imageZoomModal.querySelector('.zoom-modal-overlay');
    const zoomCloseBtn = imageZoomModal.querySelector('.zoom-close');
    const zoomImage = document.getElementById('zoomImage');
    const zoomProjectTitle = document.getElementById('zoomProjectTitle');
    const zoomCurrentImage = document.getElementById('zoomCurrentImage');
    const zoomTotalImages = document.getElementById('zoomTotalImages');
    const zoomPrevBtn = imageZoomModal.querySelector('.zoom-prev');
    const zoomNextBtn = imageZoomModal.querySelector('.zoom-next');
    const zoomLoading = imageZoomModal.querySelector('.zoom-loading');
    const zoomError = imageZoomModal.querySelector('.zoom-error');

    // 当前放大状态的变量
    let currentZoomImages = [];
    let currentZoomIndex = 0;
    let currentZoomProjectTitle = '';

    // 打开图片放大模态框
    function openImageZoomModal(projectTitle, images, startIndex) {
        // 关闭项目图片模态框
        closeGalleryModal();

        currentZoomImages = images;
        currentZoomIndex = startIndex;
        currentZoomProjectTitle = projectTitle;

        // 更新模态框标题和信息
        zoomProjectTitle.textContent = projectTitle;
        zoomTotalImages.textContent = images.length;

        // 显示模态框
        imageZoomModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // 加载并显示当前图片
        loadZoomImage();
    }

    // 加载并显示当前放大图片
    function loadZoomImage() {
        if (currentZoomImages.length === 0) return;

        const imgSrc = currentZoomImages[currentZoomIndex];

        // 显示加载状态
        zoomLoading.style.display = 'block';
        zoomError.style.display = 'none';
        zoomImage.classList.remove('loaded');
        zoomImage.style.display = 'none';

        // 更新计数器
        zoomCurrentImage.textContent = currentZoomIndex + 1;

        // 加载图片
        const img = new Image();
        img.onload = function() {
            zoomImage.src = imgSrc;
            zoomImage.alt = `${currentZoomProjectTitle} - 图片${currentZoomIndex + 1}`;
            zoomImage.style.display = 'block';
            setTimeout(() => {
                zoomImage.classList.add('loaded');
            }, 10);
            zoomLoading.style.display = 'none';
        };
        img.onerror = function() {
            zoomLoading.style.display = 'none';
            zoomError.style.display = 'block';
        };
        img.src = imgSrc;

        // 更新导航按钮状态
        updateZoomNavButtons();
    }

    // 更新导航按钮状态
    function updateZoomNavButtons() {
        zoomPrevBtn.disabled = currentZoomIndex === 0;
        zoomNextBtn.disabled = currentZoomIndex === currentZoomImages.length - 1;

        if (zoomPrevBtn.disabled) {
            zoomPrevBtn.style.opacity = '0.3';
            zoomPrevBtn.style.cursor = 'not-allowed';
        } else {
            zoomPrevBtn.style.opacity = '0.6';
            zoomPrevBtn.style.cursor = 'pointer';
        }

        if (zoomNextBtn.disabled) {
            zoomNextBtn.style.opacity = '0.3';
            zoomNextBtn.style.cursor = 'not-allowed';
        } else {
            zoomNextBtn.style.opacity = '0.6';
            zoomNextBtn.style.cursor = 'pointer';
        }
    }

    // 切换到上一张图片
    function prevZoomImage() {
        if (currentZoomIndex > 0) {
            currentZoomIndex--;
            loadZoomImage();
        }
    }

    // 切换到下一张图片
    function nextZoomImage() {
        if (currentZoomIndex < currentZoomImages.length - 1) {
            currentZoomIndex++;
            loadZoomImage();
        }
    }

    // 关闭图片放大模态框
    function closeZoomModal() {
        imageZoomModal.classList.remove('active');
        document.body.style.overflow = '';
        currentZoomImages = [];
        currentZoomIndex = 0;
    }

    // 图片放大模态框事件监听
    zoomCloseBtn.addEventListener('click', closeZoomModal);
    zoomOverlay.addEventListener('click', closeZoomModal);
    zoomPrevBtn.addEventListener('click', prevZoomImage);
    zoomNextBtn.addEventListener('click', nextZoomImage);

    // 键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        if (!imageZoomModal.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeZoomModal();
                break;
            case 'ArrowLeft':
                if (!zoomPrevBtn.disabled) prevZoomImage();
                break;
            case 'ArrowRight':
                if (!zoomNextBtn.disabled) nextZoomImage();
                break;
        }
    });

    // 防止模态框内容点击事件冒泡到覆盖层
    imageZoomModal.querySelector('.zoom-modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // ==================== 图片放大功能结束 ====================

    // 合并示例图片和data-images中的图片
    function getProjectImages(projectId, dataImages) {
        // 如果data-images不为空，使用data-images
        if (dataImages && dataImages.length > 0) {
            return dataImages;
        }
        // 否则使用示例图片
        return exampleImages[projectId] || [];
    }

    // 打开图片模态框
    function openGalleryModal(projectId, projectTitle) {
        const projectElement = document.getElementById(projectId);
        let dataImages = [];
        if (projectElement) {
            try {
                const imagesAttr = projectElement.getAttribute('data-images');
                dataImages = imagesAttr ? JSON.parse(imagesAttr) : [];
            } catch (e) {
                console.error('解析项目data-images JSON失败:', e, '属性值:', projectElement.getAttribute('data-images'));
                dataImages = [];
            }
        }
        const images = getProjectImages(projectId, dataImages);

        // 更新模态框标题
        galleryProjectTitle.textContent = projectTitle;

        // 更新图片数量
        galleryImageCount.textContent = images.length;

        // 清空现有图片
        galleryGrid.innerHTML = '';

        // 添加图片到网格
        if (images.length === 0) {
            // 没有图片时显示提示
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'gallery-empty';
            emptyMessage.innerHTML = `
                <i class="fas fa-images"></i>
                <p>该项目暂无图片</p>
                <p class="gallery-empty-hint">请在HTML的data-images属性中添加图片URL</p>
            `;
            emptyMessage.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                color: var(--text-body);
            `;
            galleryGrid.appendChild(emptyMessage);
        } else {
            images.forEach((imgSrc, index) => {
                const gridItem = document.createElement('div');
                gridItem.className = 'gallery-grid-item';
                gridItem.innerHTML = `
                    <img src="${imgSrc}" alt="${projectTitle} - 图片${index + 1}" loading="lazy">
                `;
                // 点击图片放大查看
                gridItem.addEventListener('click', function() {
                    openImageZoomModal(projectTitle, images, index);
                });
                galleryGrid.appendChild(gridItem);
            });
        }

        // 显示模态框
        projectGalleryModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    // 关闭图片模态框
    function closeGalleryModal() {
        projectGalleryModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 为所有项目项添加双击事件监听
    // 使用前面已经定义的projectItems变量（第28行）
    projectItems.forEach(item => {
        item.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const projectId = this.id;
            const projectTitle = this.querySelector('.project-title').textContent.trim();
            openGalleryModal(projectId, projectTitle);
        });

        // 添加双击提示（可选）
        const titleElement = item.querySelector('.project-title');
        if (titleElement) {
            titleElement.style.cursor = 'pointer';
            titleElement.title = '双击查看项目图片集';
        }
    });

    // 关闭模态框的事件监听
    galleryCloseBtn.addEventListener('click', closeGalleryModal);
    galleryOverlay.addEventListener('click', closeGalleryModal);

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectGalleryModal.classList.contains('active')) {
            closeGalleryModal();
        }
    });

    // 防止模态框内容点击事件冒泡到覆盖层
    projectGalleryModal.querySelector('.gallery-modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // ==================== 项目图片集功能结束 ====================

    // ==================== 获奖证书图片功能 ====================
    const awardItems = document.querySelectorAll('.award-item');

    awardItems.forEach(item => {
        let dataImages = [];
        try {
            const imagesAttr = item.getAttribute('data-images');
            dataImages = imagesAttr ? JSON.parse(imagesAttr) : [];
        } catch (e) {
            console.error('解析data-images JSON失败:', e, '属性值:', item.getAttribute('data-images'));
            dataImages = [];
        }
        console.log('奖项', item.id, '图片数组:', dataImages);
        const hoverImagesContainer = item.querySelector('.award-hover-images');

        if (!hoverImagesContainer) return;

        // 清空容器（移除注释）
        hoverImagesContainer.innerHTML = '';

        if (dataImages.length === 0) {
            // 没有图片时显示提示
            const emptyMsg = document.createElement('div');
            emptyMsg.style.cssText = 'text-align: center; color: var(--text-body); font-size: 0.9rem; padding: 20px;';
            emptyMsg.innerHTML = '<i class="fas fa-image"></i><br>暂无证书照片';
            hoverImagesContainer.appendChild(emptyMsg);
        } else {
            // 添加图片
            dataImages.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = '获奖证书';
                img.loading = 'lazy';
                img.onerror = function() {
                    console.error('图片加载失败:', imgSrc);
                    this.style.display = 'none';
                    // 可选：显示错误占位符
                    const errorDiv = document.createElement('div');
                    errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 图片加载失败';
                    errorDiv.style.cssText = 'color: #ff6b6b; font-size: 0.8rem; text-align: center;';
                    this.parentNode.appendChild(errorDiv);
                };
                hoverImagesContainer.appendChild(img);
            });
        }


        // 移动设备点击切换（类似项目经历交互）
        if (window.innerWidth <= 768) {
            item.style.cursor = 'pointer';

            item.addEventListener('click', function(e) {
                if (window.innerWidth > 768) return; // 只在移动设备生效

                e.stopPropagation();

                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                } else {
                    // 关闭其他已打开的奖项
                    document.querySelectorAll('.award-item.active').forEach(otherItem => {
                        if (otherItem !== this) {
                            otherItem.classList.remove('active');
                        }
                    });
                    this.classList.add('active');
                }
            });
        } else {
            // 桌面端：鼠标悬停时显示，离开奖项项或悬停窗时隐藏
            let hoverTimeout = null;
            const hoverContent = item.querySelector('.award-hover-content');

            // 鼠标进入奖项项时显示悬停窗
            item.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
                // 添加active类，确保悬停窗显示
                this.classList.add('active');
            });

            // 鼠标离开奖项项时，延迟隐藏悬停窗
            item.addEventListener('mouseleave', function(e) {
                // 检查鼠标是否进入了悬停窗
                const relatedTarget = e.relatedTarget;
                if (hoverContent && hoverContent.contains(relatedTarget)) {
                    // 鼠标进入了悬停窗，不清除active类
                    return;
                }
                // 否则延迟隐藏
                hoverTimeout = setTimeout(() => {
                    this.classList.remove('active');
                }, 300);
            });

            // 鼠标进入悬停窗时，确保悬停窗保持显示
            if (hoverContent) {
                hoverContent.addEventListener('mouseenter', function() {
                    clearTimeout(hoverTimeout);
                    // 确保父奖项项有active类
                    item.classList.add('active');
                });

                // 鼠标离开悬停窗时，隐藏悬停窗
                hoverContent.addEventListener('mouseleave', function(e) {
                    // 检查鼠标是否进入了奖项项
                    const relatedTarget = e.relatedTarget;
                    if (item.contains(relatedTarget) && relatedTarget !== hoverContent) {
                        // 鼠标进入了奖项项，不清除active类
                        return;
                    }
                    // 否则延迟隐藏
                    hoverTimeout = setTimeout(() => {
                        item.classList.remove('active');
                    }, 300);
                });
            }
        }
    });
    // ==================== 获奖证书图片功能结束 ====================

    // ==================== 专利证书图片功能 ====================
    const patentItems = document.querySelectorAll('.patent-item-with-images');

    patentItems.forEach(item => {
        let dataImages = [];
        try {
            const imagesAttr = item.getAttribute('data-images');
            dataImages = imagesAttr ? JSON.parse(imagesAttr) : [];
        } catch (e) {
            console.error('解析专利data-images JSON失败:', e, '属性值:', item.getAttribute('data-images'));
            dataImages = [];
        }
        console.log('专利', item.id, '图片数组:', dataImages);
        const hoverImagesContainer = item.querySelector('.patent-hover-images');

        if (!hoverImagesContainer) return;

        // 清空容器（移除注释）
        hoverImagesContainer.innerHTML = '';

        if (dataImages.length === 0) {
            // 没有图片时显示提示
            const emptyMsg = document.createElement('div');
            emptyMsg.style.cssText = 'text-align: center; color: var(--text-body); font-size: 0.9rem; padding: 20px;';
            emptyMsg.innerHTML = '<i class="fas fa-image"></i><br>暂无证书照片';
            hoverImagesContainer.appendChild(emptyMsg);
        } else {
            // 添加图片
            dataImages.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = '专利证书';
                img.loading = 'lazy';
                img.onerror = function() {
                    console.error('专利图片加载失败:', imgSrc);
                    this.style.display = 'none';
                    // 可选：显示错误占位符
                    const errorDiv = document.createElement('div');
                    errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 图片加载失败';
                    errorDiv.style.cssText = 'color: #ff6b6b; font-size: 0.8rem; text-align: center;';
                    this.parentNode.appendChild(errorDiv);
                };
                hoverImagesContainer.appendChild(img);
            });
        }

        // 移动设备点击切换（类似获奖证书交互）
        if (window.innerWidth <= 768) {
            item.style.cursor = 'pointer';

            item.addEventListener('click', function(e) {
                if (window.innerWidth > 768) return; // 只在移动设备生效

                e.stopPropagation();

                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                } else {
                    // 关闭其他已打开的专利项
                    document.querySelectorAll('.patent-item-with-images.active').forEach(otherItem => {
                        if (otherItem !== this) {
                            otherItem.classList.remove('active');
                        }
                    });
                    this.classList.add('active');
                }
            });
        } else {
            // 桌面端：鼠标悬停时显示，离开专利项或悬停窗时隐藏
            let hoverTimeout = null;
            const hoverContent = item.querySelector('.patent-hover-content');

            // 鼠标进入专利项时显示悬停窗
            item.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
                // 添加active类，确保悬停窗显示
                this.classList.add('active');
            });

            // 鼠标离开专利项时，延迟隐藏悬停窗
            item.addEventListener('mouseleave', function(e) {
                // 检查鼠标是否进入了悬停窗
                const relatedTarget = e.relatedTarget;
                if (hoverContent && hoverContent.contains(relatedTarget)) {
                    // 鼠标进入了悬停窗，不清除active类
                    return;
                }
                // 否则延迟隐藏
                hoverTimeout = setTimeout(() => {
                    this.classList.remove('active');
                }, 300);
            });

            // 鼠标进入悬停窗时，确保悬停窗保持显示
            if (hoverContent) {
                hoverContent.addEventListener('mouseenter', function() {
                    clearTimeout(hoverTimeout);
                    // 确保父专利项有active类
                    item.classList.add('active');
                });

                // 鼠标离开悬停窗时，隐藏悬停窗
                hoverContent.addEventListener('mouseleave', function(e) {
                    // 检查鼠标是否进入了专利项
                    const relatedTarget = e.relatedTarget;
                    if (item.contains(relatedTarget) && relatedTarget !== hoverContent) {
                        // 鼠标进入了专利项，不清除active类
                        return;
                    }
                    // 否则延迟隐藏
                    hoverTimeout = setTimeout(() => {
                        item.classList.remove('active');
                    }, 300);
                });
            }
        }
    });
    // ==================== 专利证书图片功能结束 ====================

    // ==================== 奖学金证书图片功能 ====================
    const scholarshipItems = document.querySelectorAll('.scholarship-item-with-images');

    scholarshipItems.forEach(item => {
        let dataImages = [];
        try {
            const imagesAttr = item.getAttribute('data-images');
            dataImages = imagesAttr ? JSON.parse(imagesAttr) : [];
        } catch (e) {
            console.error('解析奖学金data-images JSON失败:', e, '属性值:', item.getAttribute('data-images'));
            dataImages = [];
        }
        console.log('奖学金', item.id, '图片数组:', dataImages);
        const hoverImagesContainer = item.querySelector('.scholarship-hover-images');

        if (!hoverImagesContainer) return;

        // 清空容器（移除注释）
        hoverImagesContainer.innerHTML = '';

        if (dataImages.length === 0) {
            // 没有图片时显示提示
            const emptyMsg = document.createElement('div');
            emptyMsg.style.cssText = 'text-align: center; color: var(--text-body); font-size: 0.9rem; padding: 20px;';
            emptyMsg.innerHTML = '<i class="fas fa-image"></i><br>暂无证书照片';
            hoverImagesContainer.appendChild(emptyMsg);
        } else {
            // 添加图片
            dataImages.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = '奖学金证书';
                img.loading = 'lazy';
                img.onerror = function() {
                    console.error('奖学金图片加载失败:', imgSrc);
                    this.style.display = 'none';
                    // 可选：显示错误占位符
                    const errorDiv = document.createElement('div');
                    errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 图片加载失败';
                    errorDiv.style.cssText = 'color: #ff6b6b; font-size: 0.8rem; text-align: center;';
                    this.parentNode.appendChild(errorDiv);
                };
                hoverImagesContainer.appendChild(img);
            });
        }

        // 移动设备点击切换（类似获奖证书交互）
        if (window.innerWidth <= 768) {
            item.style.cursor = 'pointer';

            item.addEventListener('click', function(e) {
                if (window.innerWidth > 768) return; // 只在移动设备生效

                e.stopPropagation();

                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                } else {
                    // 关闭其他已打开的奖学金项
                    document.querySelectorAll('.scholarship-item-with-images.active').forEach(otherItem => {
                        if (otherItem !== this) {
                            otherItem.classList.remove('active');
                        }
                    });
                    this.classList.add('active');
                }
            });
        } else {
            // 桌面端：鼠标悬停时显示，离开奖学金项或悬停窗时隐藏
            let hoverTimeout = null;
            const hoverContent = item.querySelector('.scholarship-hover-content');

            // 鼠标进入奖学金项时显示悬停窗
            item.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
                // 添加active类，确保悬停窗显示
                this.classList.add('active');
            });

            // 鼠标离开奖学金项时，延迟隐藏悬停窗
            item.addEventListener('mouseleave', function(e) {
                // 检查鼠标是否进入了悬停窗
                const relatedTarget = e.relatedTarget;
                if (hoverContent && hoverContent.contains(relatedTarget)) {
                    // 鼠标进入了悬停窗，不清除active类
                    return;
                }
                // 否则延迟隐藏
                hoverTimeout = setTimeout(() => {
                    this.classList.remove('active');
                }, 300);
            });

            // 鼠标进入悬停窗时，确保悬停窗保持显示
            if (hoverContent) {
                hoverContent.addEventListener('mouseenter', function() {
                    clearTimeout(hoverTimeout);
                    // 确保父奖学金项有active类
                    item.classList.add('active');
                });

                // 鼠标离开悬停窗时，隐藏悬停窗
                hoverContent.addEventListener('mouseleave', function(e) {
                    // 检查鼠标是否进入了奖学金项
                    const relatedTarget = e.relatedTarget;
                    if (item.contains(relatedTarget) && relatedTarget !== hoverContent) {
                        // 鼠标进入了奖学金项，不清除active类
                        return;
                    }
                    // 否则延迟隐藏
                    hoverTimeout = setTimeout(() => {
                        item.classList.remove('active');
                    }, 300);
                });
            }
        }
    });
    // ==================== 奖学金证书图片功能结束 ====================

    // 移动设备触摸优化
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');

        // 为可点击元素添加活动状态
        const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .project-title');
        interactiveElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.classList.add('active-touch');
            });

            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('active-touch');
                }, 150);
            });
        });
    }
});

// 添加一些CSS到head中（动态样式）
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .project-title.active {
        color: var(--text-accent) !important;
    }

    .touch-device .skill-tag:active,
    .touch-device .project-title:active {
        transform: scale(0.95);
        transition: transform 0.1s ease;
    }

    .active-touch {
        opacity: 0.8;
    }

    @media print {
        .print-button {
            display: none !important;
        }

        .back-to-top {
            display: none !important;
        }

        .gallery-modal,
        .zoom-modal {
            display: none !important;
        }
    }
`;

document.head.appendChild(dynamicStyles);