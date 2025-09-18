# Vercel Deployment Guide for Secret Bet Hide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare all required environment variables

## Step-by-Step Deployment Instructions

### Step 1: Connect GitHub Repository to Vercel

1. **Login to Vercel Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" button
   - Select "Import Git Repository"
   - Choose `yejunxi88/secret-bet-hide` from the list
   - Click "Import"

### Step 2: Configure Build Settings

1. **Framework Preset**
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. **Root Directory**
   - Leave as default (root of repository)

### Step 3: Set Environment Variables

In the Vercel dashboard, go to **Settings > Environment Variables** and add:

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url_here

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
NEXT_PUBLIC_RPC_URL=your_alternative_rpc_url
```

**Important**: Make sure to set these for all environments (Production, Preview, Development).

### Step 4: Configure Build Settings

1. **Node.js Version**
   - Go to **Settings > General**
   - Set Node.js Version to `18.x` or `20.x`

2. **Build Command Override**
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Step 5: Deploy

1. **Automatic Deployment**
   - Vercel will automatically deploy when you push to the main branch
   - Go to **Deployments** tab to monitor the build process

2. **Manual Deployment**
   - Click "Deploy" button in the dashboard
   - Wait for the build to complete

### Step 6: Verify Deployment

1. **Check Build Logs**
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Check the build logs for any errors

2. **Test the Application**
   - Visit the provided Vercel URL
   - Test wallet connection
   - Verify all features work correctly

### Step 7: Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to **Settings > Domains**
   - Add your custom domain
   - Configure DNS records as instructed

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - No additional configuration needed

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` | Sepolia testnet chain ID |
| `NEXT_PUBLIC_RPC_URL` | `your_rpc_url_here` | RPC endpoint for blockchain |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `your_wallet_connect_project_id` | WalletConnect project ID |
| `NEXT_PUBLIC_INFURA_API_KEY` | `your_infura_api_key` | Infura API key |

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18.x or 20.x)
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

2. **Environment Variables**
   - Ensure all variables are set for all environments
   - Check variable names (case-sensitive)
   - Verify values are correct

3. **Wallet Connection Issues**
   - Verify WalletConnect project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches the network

### Build Optimization

1. **Bundle Size**
   - The project uses code splitting for optimal performance
   - RainbowKit and Wagmi are tree-shaken for minimal bundle size

2. **Caching**
   - Vercel automatically caches dependencies
   - Build cache is preserved between deployments

## Monitoring and Analytics

1. **Vercel Analytics**
   - Enable Vercel Analytics in the dashboard
   - Monitor performance and user behavior

2. **Error Tracking**
   - Check function logs in the Vercel dashboard
   - Monitor for runtime errors

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to the repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**
   - Vercel automatically provides HTTPS
   - Ensure all external API calls use HTTPS

## Performance Optimization

1. **CDN**
   - Vercel's global CDN automatically serves static assets
   - Images and assets are optimized automatically

2. **Edge Functions**
   - Consider using Vercel Edge Functions for API routes
   - Reduce latency for global users

## Maintenance

1. **Updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Test thoroughly before deploying updates

2. **Monitoring**
   - Set up alerts for build failures
   - Monitor application performance
   - Track user engagement metrics

## Support

For issues with deployment:
1. Check Vercel documentation
2. Review build logs
3. Contact Vercel support if needed
4. Check GitHub repository for issues

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/installation)
- [Wagmi Documentation](https://wagmi.sh/)
