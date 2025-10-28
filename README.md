This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 推送项目到GitHub

### 1. 初始化Git仓库（如果尚未初始化）

```bash
git init
```

### 2. 添加远程仓库

```bash
git remote add origin https://github.com/suwenge-game/location-n8n.git
```

### 3. 配置用户信息（首次使用Git时）

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 4. 添加文件到暂存区

```bash
# 添加所有文件
git add .

# 或者添加特定文件
git add README.md package.json
```

### 5. 提交更改

```bash
# 使用conventional commit格式
git commit -m "feat: 添加新功能"
git commit -m "fix: 修复bug"
git commit -m "docs: 更新文档"
git commit -m "chore: 更新依赖"
```

### 6. 推送到GitHub

```bash
# 首次推送
git push -u origin main

# 后续推送
git push
```

### 7. 处理网络连接问题

如果遇到网络连接问题，可以尝试以下解决方案：

#### 方案1：配置SSH密钥（推荐）

1. 生成SSH密钥：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. 启动SSH代理并添加密钥：

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

3. 复制公钥到GitHub：

```bash
cat ~/.ssh/id_ed25519.pub
```

4. 将公钥添加到GitHub账户的SSH设置中

5. 更改远程URL为SSH格式：

```bash
git remote set-url origin git@github.com:suwenge-game/location-n8n.git
```

#### 方案2：配置Git网络设置

```bash
# 增加缓冲区大小
git config --global http.postBuffer 524288000

# 设置超时时间
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999

# 使用HTTP/1.1协议
git config --global http.version HTTP/1.1
```

#### 方案3：使用代理（如果需要）

```bash
# 设置HTTP代理
git config --global http.proxy http://proxy-server:port

# 设置HTTPS代理
git config --global https.proxy https://proxy-server:port
```

### 8. 常见问题解决

- **合并冲突**：使用 `git pull --no-rebase` 然后手动解决冲突
- **权限问题**：确保GitHub账户有仓库的推送权限
- **网络超时**：尝试使用SSH方式或配置代理
- **提交格式错误**：使用conventional commit格式，如 `feat:`、`fix:`、`docs:` 等

### 9. 工作流程建议

```bash
# 1. 拉取最新代码
git pull

# 2. 查看状态
git status

# 3. 添加更改
git add .

# 4. 提交更改
git commit -m "feat: 描述你的更改"

# 5. 推送代码
git push
```
