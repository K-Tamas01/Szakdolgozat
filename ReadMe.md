Mongo-Express login data:
username: admin
password: pass


Ha nincs metrics-server:
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

kubectl edit deploy metrics-server -n kube-system

- --kubelet-insecure-tls=true